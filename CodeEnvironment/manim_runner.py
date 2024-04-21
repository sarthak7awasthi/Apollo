from openai import OpenAI
import subprocess
import os
from dotenv import load_dotenv
import ast

load_dotenv()

def create_assistant(client):
    assistant = client.beta.assistants.create(
        display_name="Manim Assistant",
        description="Assistant to generate Manim code",
        instructions="Write Python code to create a Manim animation",
    )
    print('Created assistant:', assistant.id)
    return assistant.id

def init_assistant(client):
    assistant_list = client.beta.assistants.list()
    for assistant in assistant_list.data:
        if assistant.name == "Manim Assistant":
            print('Found assistant:', assistant.id)
            return assistant.id, assistant.instructions
    

def select_assistant(client, assistant_id):
    # Use the 'beta.assistants' attribute, not 'Assistant'
    assistant = client.beta.assistants.retrieve(assistant_id)
    print('Selected assistant:', assistant.id)
    return assistant.id

def create_thread(client, prompt):

    thread = client.beta.threads.create()
    msg = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=prompt
    )
    print('Created thread:', thread.id)    

    return thread.id

def generate_manim_code(client, prompt, assistant_id):
    thread = create_thread(client, prompt)
    
    run = client.beta.threads.runs.create_and_poll(thread_id=thread, assistant_id=assistant_id)
    try:
        if run.status == 'completed':
            messages = client.beta.threads.messages.list(thread_id=thread)
            code = messages.data[0].content[0].text.value
            code_cleaned = code.replace('```python', '').replace('```', '')
            return code_cleaned
    except:
        return run.status

def create_path(string):
    path = os.path.join(os.getcwd(), string)
    if not os.path.exists(path):
        os.makedirs(path)
    return path

def generated_video(input_path, class_name):
    command = ["manim", "-ql", input_path, class_name]
    # Execute the command
    subprocess.run(command)

    # Find the path of the video file and return it
    # It should be under cwd/media/videos/prompt/480p15/GenScene.mp4
    video_path = os.path.join(os.getcwd(), f'media/videos/prompt/480p15/{class_name}.mp4')
    return video_path

def get_class_names_from_code(source_code):
    # Parse the source code into an AST
    tree = ast.parse(source_code)

    # Walk through the AST
    for node in ast.walk(tree):
        # Check if the node is a ClassDef
        if isinstance(node, ast.ClassDef):
            # Append the class name to the list
            return node.name


def text_to_animation(PROMPT):

    API_KEY = os.getenv('OPENAI_API_KEY')
    ASSISTANT_ID = os.getenv('ASSISTANT_ID')


    client = OpenAI(api_key=API_KEY)

    ass1, instruction = init_assistant(client)
    if not ass1:
        ass1 = ASSISTANT_ID
    # print(instruction)
    # prompt = instruction + prompt
    messages = generate_manim_code(client, instruction+'\n'+PROMPT, ass1)
    class1 = get_class_names_from_code(messages)
    
    if type(messages) == str:
        print('MESSAGES')
        print(messages)

    code_path = create_path('manimcode')
    with open("{}/prompt.py".format(code_path), "w") as f:
        f.write(messages)

    try:
        path_to_animation = generated_video(input_path=f'{code_path}/prompt.py', class_name=class1)
    except:
        print('HERE')
        addiitonal_prompt = 'Your earlier response was not valid. Please try again.'
        messages =  generate_manim_code(client, PROMPT + addiitonal_prompt, ass1)
        class1 = get_class_names_from_code(messages)
        path_to_animation = generated_video(input_path=f'{code_path}/prompt.py', class_name=class1)
    
    
    # print('Path to animation:', path_to_animation)

    return path_to_animation

