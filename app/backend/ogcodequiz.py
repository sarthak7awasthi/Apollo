import openai
import os
import json

# Load API key from an environment variable for security
openai.api_key = "sk-proj-lmbm0SqdChLwd2mlIGbjT3BlbkFJlLGQ8Re0yrgGGVTOscjj"

def create_quiz_questions(topic, num_questions=5):
    """Generate multiple quiz questions on a specific topic using OpenAI's API."""
    try:
        # Construct the prompt for the API
        system_prompt = {
            "role": "system",
            "content": "You are a helpful assistant. Please generate multiple-choice quiz questions on the specified topic. Each question should come with four options and a clearly indicated correct answer. Format the response as a JSON object."
        }
        user_prompt = {
            "role": "user",
            "content": f"Generate {num_questions} quiz questions about {topic} with options and indicate the correct answer."
        }
        
        # Make the API call
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[system_prompt, user_prompt]
        )
        
        # Extract the response and parse as JSON
        json_text = response.choices[0].message['content']
        return json.loads(json_text)  # Assuming the response is in correct JSON format

    except openai.error.OpenAIError as e:
        print(f"An error occurred: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

def main():
    topic = input("Enter the topic you'd like to learn about: ")
    questions_json = create_quiz_questions(topic)
    if questions_json:
        print(json.dumps(questions_json, indent=4))
    else:
        print("Failed to generate questions or parse JSON correctly. Please check your API usage and settings.")

if __name__ == "__main__":
    main()
