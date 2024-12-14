# Import necessary libraries
import time
import openai
import pymupdf
import json
import pytesseract
import pptx
from PIL import Image
from pydantic import BaseModel
from typing import List
from datetime import datetime

# Define data structures using Pydantic models
class SubTask(BaseModel):
    name: str
    description: str
    start_date: datetime
    end_date: datetime

class Task(BaseModel):
    name: str
    description: str
    start_date: datetime
    end_date: datetime
    sub_tasks: List[SubTask]

class Project(BaseModel):
    name: str
    description: str
    start_date: datetime
    end_date: datetime
    tasks: List[Task]

# Functions to create instances of the data structures
def create_sub_task(name: str, description: str, start_date: datetime, end_date: datetime):
    return SubTask(name=name, description=description, start_date=start_date, end_date=end_date)

def create_task(name: str, description: str, start_date: datetime, end_date: datetime, sub_tasks: List[dict]):
    sub_tasks = [create_sub_task(**sub_task) for sub_task in sub_tasks]
    return Task(name=name, description=description, start_date=start_date, end_date=end_date, sub_tasks=sub_tasks)

def create_project(name: str, description: str, start_date: datetime, end_date: datetime, tasks: List[dict]):
    tasks = [create_task(**task) for task in tasks]
    return Project(name=name, description=description, start_date=start_date, end_date=end_date, tasks=tasks)

# Initialize OpenAI API key
OPENAI_API_KEY = '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'
LLM = openai.OpenAI(api_key=OPENAI_API_KEY)

# Instructions for generating project descriptions
GENERATE_PROJECT_INSTRUCTIONS = """
You are an agent who creates SUPER detailed project descriptions.
A project has a name, detailed description, start date, end date, and a list of tasks.
A task has a name, detailed description, start date, end date, and a list of sub-tasks.
A sub-task has a name, detailed description, start date, and end date.
A project may have anywhere from 3-6 main tasks.
A task may have anywhere from 3-12 sub-tasks.
Try to use 5 main tasks and 6 sub tasks on average, but you may vary this based on the complexity of the project.
Estimate the time required for each task and sub-task based on the skill level of an experienced developer.
All descriptions of tasks and sub tasks should be AS DETAILED AS POSSIBLE, and should be about 2-4 paragraphs of detail-oriented text.
A description should include: what tools are required to complete the task or subtask, what prior knowledge is necessary, and what steps are needed to complete the task or subtask.
The project description should be so obviously detailed and clear that anyone can understand it."""

# Functions to load data from different file types
def load_pdf(file_path):
    doc = pymupdf.open(file_path)
    text = "".join(page.get_text() for page in doc)
    return text

def load_image(file_path):
    img = Image.open(file_path)
    text = pytesseract.image_to_string(img)
    return text

def load_pptx(file_path):
    prs = pptx.Presentation(file_path)
    text = "\n".join([slide.text for slide in prs.slides])
    return text

# Function to generate context for the LLM
def generate_context(chat_input=False, gig_data=False, additional_files=[]):
    context = ""

    if chat_input:
        chat_input = "\nUSER INPUT> " + chat_input
    else:
        chat_input = ""

    additional_files_content = '\n'.join(
        [f'Here is the content of the additional file {i + 1}: {additional_file}' for i, additional_file in enumerate(additional_files)]
    )

    context += additional_files_content + chat_input

    if gig_data:
        if isinstance(gig_data, dict):
            gig_data = json.dumps(gig_data, indent=2)
        context = f'Here is the current JSON description for the project:\n {gig_data}\n{context}'
        
    return context

# If not context ask user for info
def prompt_user_for_info():
    messages = [{
        'role': 'system',
        'content': """Ask the user for more info about the project they want you to describe. 
        Once you are done asking questions call the done funtion."""
    },
    {
        'role': 'assistant',
        'content': "could you provide me with more details about the project?"
    }]

    print("bot > could you provide me with more details about the project?")

    chat_input = ""

    for i in range(0, 100):
        input_text = input("you > ")

        messages.append({
            'role': 'user',
            'content': input_text
        })

        chat_input += input_text + "\n"

        res = LLM.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            functions=[
                {
                    'name': 'done',
                    'description': 'Indicate that the user has provided all the necessary information',
                    'parameters': {}
                }
            ]
        )

        if res.choices[0].message.function_call:
            print("BOT > Thanks for the info!")
            break

        messages.append({
            'role': 'assistant',
            'content': res.choices[0].message.content
        })

        chat_input += res.choices[0].message.content + "\n"
        print("bot > " + res.choices[0].message.content)


    return chat_input

# Define custom functions for the LLM
custom_functions = [
    {
        "name": "create_project",
        "description": "Create a complete project description with tasks and sub-tasks",
        "parameters": Project.model_json_schema()
    },
]

# Function to generate a project description using the LLM
def generate_project(context):
    messages = [
        {"role": "system", "content": GENERATE_PROJECT_INSTRUCTIONS},
        {"role": "system", "content": context},
        {"role": "user", "content": "Generate the project description."},
    ]

    res = LLM.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        functions=custom_functions
    )

    return messages + [{'role': 'assistant', 'content': res.choices[0].message.content}], res 

# Main function to run the script
if __name__ == '__main__':
    gig_data = input("do you have a gig.json file? > ")
    additional_files = input("do you have any additional files? > ").split(' ')

    for i in range(len(additional_files)):
        try: 
            if '.pdf' in additional_files[i]:
                data = load_pdf(additional_files[i])
            elif '.pptx' in additional_files[i]:
                data = load_pptx(additional_files[i])
            elif '.jpg' in additional_files[i] or '.png' in additional_files[i]: 
                data = load_image(additional_files[i])
            else:
                # TODO: Handle other file types
                raise Exception("Unsupported file type")
        
            additional_files[i] = data
        except:
            additional_files[i] = False
    
    additional_files = list(filter(lambda x: x, additional_files))

    try:
        gig_data = json.loads(open(gig_data).read())
    except:
        gig_data = False

    if len(additional_files) == 0 and not gig_data:
        print("hmm.. looks like we don't have enough information...\n")

        chat_input = prompt_user_for_info()

    else:
        chat_input = input("anything else to add? > ")
    
    start = time.time()

    context = generate_context(
        chat_input=chat_input, 
        gig_data=gig_data, 
        additional_files=additional_files
    )

    messages, res = generate_project(context)
    
    model_json = json.loads(res.choices[0].message.function_call.arguments)

    with open('out/function.json', 'w') as f:
        json.dump(model_json, f, indent=2)

    project = create_project(**model_json)

    print("Completed in {:.4f} seconds".format(time.time() - start))