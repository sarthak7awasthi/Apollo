#Write code to access GPT-4 TURBO api and get the response from the model
# The query is to generate Lecture Content from courseName, courseDescription, lectureName, lectureDescription and lectureDuration
# Depending on assignmentAgents, we should generate assignmentName and assignmentDescription

from openai import OpenAI
import json
import os
from dotenv import load_dotenv

load_dotenv()

def init_openai():
    API_KEY = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=API_KEY)
    return client

def generate_quiz_questions(client, topic, num_questions=5):
    OUTPUT_FORMAT = """{
        'questions': [
            {
                'question': '..',
                'options': ['..', '..', '..', '..'],
                'correct_answer': '..'
            },
            ...
        ]
    }"""
    system_prompt =  "You are a helpful assistant. Please generate multiple-choice quiz questions on the specified topic. Each question should come with four options and a clearly indicated correct answer. Format the response as a JSON object of format f{OUTPUT_FORMAT}"

    user_prompt = f"Generate {num_questions} quiz questions about {topic} with options and indicate the correct answer."

    
    msg = get_gpt_response(client, system_prompt, user_prompt)
    msg = msg.replace("'''json", "").replace("'''", "")
    # print(msg)
    questions_json = json.loads(msg)
    return questions_json

def get_gpt_response(client, system_prompt, prompt):
    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
    ]
    )

    message = completion.choices[0].message.content

    return message

'''CREATE CONTENT'''
def generate_content(client, courseName, courseDescription, lectureName, lectureDescription, lectureDuration, assignmentAgents):
    system_prompt = f"You are a lecturer skilled in the {courseName} discipline. You are creating lecture content for the course. You've to write short descriptions. Only output a short paragraph"

    prompt = f"Generate Lecture Content for a course on {courseName} with the following details: \n\nCourse Description: {courseDescription} \n\nLecture Name: {lectureName} \n\nLecture Description: {lectureDescription} \n"
    lectureContent = get_gpt_response(client, system_prompt, prompt)

    all_assignments = []
    for agent in assignmentAgents:
        assignmentContent = ""
        prompt = f"Generate {agent} assignment content for the topic of {lectureName} with the following details:\nLecture Description: {lectureDescription} \nLecture Duration: {lectureDuration} \n"
        if agent == "quiz":
            assignmentContent = generate_quiz_questions(init_openai(), lectureName)
            
        elif agent == "code":
            prompt = f"Generate a simple coding assignment for the topic of {lectureName} with the following details:\nLecture Description: {lectureDescription} Only 1-2 lines question \n"
            assignmentContent = get_gpt_response(client, system_prompt, prompt)
        else:
            assignmentContent = get_gpt_response(client, system_prompt, prompt)

        all_assignments.append({
            "assignmentName": f"{agent} Assignment",
            "assignmentDescription": assignmentContent,
            "assignmentDuration": lectureDuration,
            "assignmentAgents": [agent]
        })
    
    return lectureContent, all_assignments
  

def clean_data(client, json_data):
    courseName = json_data["courseName"]
    courseDescription = json_data["courseDescription"]
    lectures = json_data["lectures"]
    lecture_list = []

    for lecture in lectures:
        
        lectureName = lecture["lectureName"]
        lectureDescription = lecture["lectureDescription"]
        lectureResources = lecture["lectureResources"]
        lectureDuration = lecture["lectureDuration"]
        assignmentAgents = lecture["assignmentAgents"]
        lectureContent, assignment_list = generate_content(client, courseName, courseDescription, lectureName, lectureDescription, lectureDuration, assignmentAgents)

        lecture_list.append({
            "lectureName": lectureName,
            "lectureDescription": lectureDescription,
            "lectureContent": lectureContent,
            "lectureDuration": lectureDuration,
            "lectureResources": lectureResources,
            "Audio": None,
            "Lipsync": None,
            "assignments": assignment_list
        })

    data_populated = {
        "courseName": courseName,
        "language": "English",
        "courseDescription": courseDescription,
        "lectures": lecture_list
    }

    json_data = json.dumps(data_populated, indent=4)
    print(json_data)
    return data_populated

def create_content(INPUT_JSON):
    client = init_openai()

    populated_data = clean_data(client, INPUT_JSON)
    return populated_data



# def main():
 
#     input = {
#         "courseName": "UI",
#         "courseDescription": "This course is about User Interface Design",
#         "lectures": [
#             {
#                 "lectureName": "Introduction to UI",
#                 "lectureDescription": "This lecture introduces the concept of User Interface Design",
#                 "lectureDuration": "1 hour",
#                 "lectureResources": ["slides"],
#                 "assignmentAgents": ["quiz", "code"]
#             }]
#     }

#     # json_to_fields(client, json_data)
#     # populated_data = create_content(input)
#     populated_data = generate_quiz_questions(init_openai(), "Python Loops")
#     json_data = json.dumps(populated_data, indent=4)
#     with open("output.json", "w") as f:
#         f.write(json_data)

# if __name__ == "__main__":
#     main()