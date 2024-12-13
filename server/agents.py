import openai
import pymupdf
import json
from pydantic import BaseModel
from typing import List
import instructor
import openai
import time
import datetime
from itertools import product
from datetime import datetime, timedelta
import util

# Set up your OpenAI API key
openai.api_key = util.OPEN_AI_KEY

analyze_client = openai.OpenAI(api_key=openai.api_key)

# Function to get response from OpenAI's GPT-3.5-turbo model
def get_gpt_response(messages):
    response = openai.chat.completions.create(  # Updated method name for v1.0.0+
        model="gpt-3.5-turbo",
        messages=messages
    )
    return response.choices[0].message.content

# Function to initialize conversation history with initial context
def initialize_conversation(initial_context_path):
    initial_context = open(initial_context_path, "r").read()
    return [{"role": "system", "content": initial_context}]

# Function to generate JSON based on conversation
def generate_json_from_conversation(conversation_str):
    prompt = """Extract data from the conversation.  if all the values are null try to fill them in. ONLY CHANGE WHAT THE USER PROMPTS YOU TO CHANGE AND LEAVE ALL OTHER VALUES NULL.  Please respond in JSON format:
    {
        event_name: ..., // string
        deadline_date: ..., // date
        deadline_time: ..., // time in HH:mm:ss 24 hour
        short_description: ..., // str
        long_description : ..., // str
        cash_prize: ..., // integer
        required_skills: ..., // List[str]
        other_prizes: ..., // List[str]
    }""" + conversation_str

    response = analyze_client.beta.chat.completions.parse(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )

    return response.choices[0].message.content

def challenge_generator(method, data):
    print("handling convo")
    if method != 'POST':
        return 'Method not allowed', 405

    conversation_history = data.get('conversation_history', [])
    
    if (len(conversation_history) <= 2):
        conversation_history = initialize_conversation("initial_context.txt") + conversation_history
    
    user_input = data.get('user_input', "")
    conversation_history.append({"role": "user", "content": user_input})
    
    assistant_response = get_gpt_response(conversation_history)
    conversation_history.append({"role": "assistant", "content": assistant_response})
    
    conversation_str = ""
    for i in conversation_history:
        if i["role"] == "user":
            conversation_str += "User: " + i["content"] + "\n"
        elif i["role"] == "assistant":
            conversation_str += "Assistant: " + i["content"] + "\n"

        i["content"] = i["content"].replace("\n", "<br>")

    conversation_str = conversation_str.replace("\n", "<br>")

    filled_json = generate_json_from_conversation(conversation_str)
    
    print(filled_json)

    return {
        "assistant_response": assistant_response,
        "conversation_history": conversation_history,
        "filled_json": filled_json
    }, 200

def days_between(d1, d2):
    """
    Calculate the number of days between two dates.
    
    Args:
        d1 (str): The first date in YYYY-MM-DD format.
        d2 (str): The second date in YYYY-MM-DD format.
        
    Returns:
        int: The number of days between the two dates.
    """
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)

class Task(BaseModel):
    """
    A class representing a task.
    
    Attributes:
        task_name (str): The name of the task.
        task_description (str): The description of the task.
    """
    task_name: str
    task_description: str

class Tasks(BaseModel):
    """
    A class representing a list of tasks.
    
    Attributes:
        tasks (List[Task]): A list of Task objects.
    """
    tasks: List[Task]

class TimeEstimate(BaseModel):
    """
    A class representing a time estimate.
    
    Attributes:
        min_days (int): The minimum number of days.
        max_days (int): The maximum number of days.
    """
    min_days: int
    max_days: int

def load_pdf(file_path):
    """
    Load text content from a PDF file.
    
    Args:
        file_path (str): The path to the PDF file.
        
    Returns:
        str: The text content of the PDF file.
    """
    doc = pymupdf.open(file_path)
    text = "".join(page.get_text() for page in doc)
    return text

client = instructor.from_openai(
    openai.OpenAI(
        base_url="http://localhost:11434/v1",
        api_key="ollama",  # required, but unused
    ),
    mode=instructor.Mode.JSON,
)

openai_client = openai.OpenAI(api_key=openai.api_key)

def get_formatted_response(full_prompt, format_, model='ollama'):
    """
    Get a formatted response from the specified model.
    
    Args:
        full_prompt (str): The full prompt to send to the model.
        format_ (type): The expected response format.
        model (str): The model to use ('ollama', 'gpt4', or 'gpt-3.5-turbo').
        
    Returns:
        str: The formatted response.
    """
    if model == 'ollama':
        response = client.chat.completions.create(
            model="llama3.3",
            messages=[{'role': 'user', 'content': full_prompt}],
            response_model=format_
        )
        return response.model_dump_json(indent=2)
    elif model == 'gpt4':
        response = openai_client.beta.chat.completions.parse(
            model="gpt-4o-mini-2024-07-18",
            messages=[{'role': 'system', 'content': full_prompt}],
            response_format=format_
        )
        return response.choices[0].message.content
    else:
        response = openai_client.beta.chat.completions.parse(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system", 
                    "content": full_prompt
                }
            ],
            response_format={"type": "json_object"}
        )

        return Tasks.model_validate(json.loads(response.choices[0].message.content))

def create_full_prompt(prompt, gig_str, additional_files):
    """
    Create a full prompt by combining the prompt, gig description, and additional files.
    
    Args:
        prompt (str): The initial prompt.
        gig_str (str): The gig description.
        additional_files (list): A list of additional file contents.
        
    Returns:
        str: The full prompt.
    """
    additional_files_content = '\n'.join(
        [f'Here is the content of the additional file {i}: {additional_file}' for i, additional_file in enumerate(additional_files)]
    )
    return f'Here is the current description for the project: {gig_str}\n{additional_files_content}\n{prompt}'

def checkpoints_generator(method, gig_str, additional_files):
    if method != 'POST':
        return 'Method not allowed', 405

    gig = json.loads(gig_str)
    additional_files = [load_pdf(filename) for filename in additional_files]

    start = time.time()

    generate_main_task_prompt = """
    Break down the overall project from start to completion into a sequential list of tasks. 
    Be specific and detailed, explaining what tools, technologies, and techniques will be used for each task. 
    There should be 3-5 tasks. Return a JSON list of tasks names and descriptions."""
    full_prompt = create_full_prompt(generate_main_task_prompt, gig_str, additional_files)
    response = get_formatted_response(full_prompt, Tasks, "gpt4")
    main_tasks = json.loads(response)["tasks"]
    print("Time taken to generate main tasks:", time.time() - start)

    for main_task in main_tasks:
        start_ = time.time()
        generate_sub_tasks_prompt = f"""Here is the data for the main task:\n{json.dumps(main_task)}
        Identify a sequential list subtasks based off of the larger task.
        Be specific and detailed, explaining what tools, technologies, and techniques will be used for each subtask. 
        The completion of the last subtask should lead to the completion of the main task.
        There should be 0-3 subtasks, but try to keep them to a minimum (on average 1-2 subtasks). Return a JSON list of subtasks names and descriptions.""" 

        full_prompt = create_full_prompt(generate_sub_tasks_prompt, gig_str, additional_files)
        response = get_formatted_response(full_prompt, Tasks, "gpt4")
        print(f"Time taken to generate subtasks:", time.time() - start_)
        main_task["sub_tasks"] = json.loads(response)["tasks"]

    for main_task in main_tasks:
        for subtask in main_task['sub_tasks']:
            full_prompt = create_full_prompt(f"How long should this subtask take in days for an average 4th year college student studying computer science? {subtask['task_description']}", gig_str, additional_files)
            response = get_formatted_response(full_prompt, TimeEstimate, "gpt4")
            subtask["min_days"], subtask["max_days"] = list(json.loads(response).values())

    start_date = datetime.today()

    subtask_ranges = []
    for main_task in main_tasks:
        for subtask in main_task['sub_tasks']:
            min_days = subtask["min_days"]
            max_days = subtask["max_days"]
            range_ = list(range(min_days, max_days))
            if len(range_) == 0:
                range_ = [min_days]
            subtask_ranges.append(range_)

    combinations = list(product(*subtask_ranges))
    estimated_days = None
    allowed_number_of_days = days_between(gig['deadline_date'], datetime.today().strftime("%Y-%m-%d"))

    for combination in combinations:
        if sum(combination) <= allowed_number_of_days:
            estimated_days = combination
            break

    if not estimated_days:
        estimated_days = list(min(combinations, key=sum))

    if estimated_days:
        current_date = start_date
        for _, main_task in enumerate(main_tasks):
            main_task_start_date = None
            main_task_end_date = None
            for subtask in main_task['sub_tasks']:
                subtask_duration = estimated_days.pop(0)
                subtask_start_date = current_date
                subtask_end_date = current_date + timedelta(days=subtask_duration)
                subtask["estimated_start_date"] = subtask_start_date.strftime("%Y-%m-%d")
                subtask["estimated_end_date"] = subtask_end_date.strftime("%Y-%m-%d")
                del subtask['min_days']
                del subtask['max_days']
                current_date = subtask_end_date + timedelta(days=1)
                if main_task_start_date is None:
                    main_task_start_date = subtask_start_date
                main_task_end_date = subtask_end_date
            main_task["estimated_start_date"] = main_task_start_date.strftime("%Y-%m-%d")
            main_task["estimated_end_date"] = main_task_end_date.strftime("%Y-%m-%d")

    print("Finished checkpoint generation in ", time.time() - start)

    return main_tasks, 200