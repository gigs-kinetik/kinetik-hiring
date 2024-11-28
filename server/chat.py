import openai

# Set up your OpenAI API key
openai.api_key = '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'

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
    prompt = """Extract data from the conversation. Please respond in JSON format:
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

def handle_conversation(method, data):
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