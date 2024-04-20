import os
from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
from db import Mongo

app = Flask(__name__)
CORS(app)

URI = os.environ.get("URI")
if not URI:
    raise RuntimeError("MONGO DB URI NOT SET")

mongodb = Mongo(URI, "Codefest24")

@app.route('/runcode', methods=['POST'])
def run_code():
    data = request.json
    language = data.get('language')
    code = data.get('code')

    if language == 'python':
        return execute_python_code(code)
    elif language == 'c':
        return execute_c_code(code)
    else:
        return jsonify({'error': 'Invalid language specified'}), 400

def execute_python_code(code):
    try:
        # Create a buffer to capture the standard output
        import io
        output_buffer = io.StringIO()

        # Redirect standard output to the buffer
        import sys
        sys.stdout = output_buffer

        # Execute the Python code
        exec(code)

        # Restore standard output
        sys.stdout = sys.__stdout__

        # Get the captured output
        output = output_buffer.getvalue()

        # Return the output in the response
        return jsonify({'output': output}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def execute_c_code(code):
    try:
        # Write the code to a temporary file
        with open('temp.c', 'w') as file:
            file.write(code)
        
        # Compile the C code
        compile_process = subprocess.Popen(['gcc', 'temp.c', '-o', 'temp'], stderr=subprocess.PIPE)
        compile_output, compile_error = compile_process.communicate()

        if compile_process.returncode != 0:
            return jsonify({'error': compile_error.decode()}), 400

        # Execute the compiled binary
        execute_process = subprocess.Popen(['./temp'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        execute_output, execute_error = execute_process.communicate()

        if execute_process.returncode != 0:
            return jsonify({'error': execute_error.decode()}), 400

        return jsonify({'output': execute_output.decode()}), 200
    finally:
        # Clean up temporary files
        subprocess.run(['rm', '-f', 'temp.c', 'temp'])



@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({'error': 'Bad Request'}), 400

@app.route('/cc', methods=['POST'])
def createCourse():
    if request.is_json:
        data = request.json
        name = data.get("name")
        owner = data.get("owner")
        language = data.get("language")
        description = data.get("description")
        
        if name and owner and language and description:
            create_status = mongodb.createCourse(name, owner, language, description)
            return jsonify({}), 200 if create_status else 400
        else:
            return jsonify({'error': 'Invalid data. All fields are required.'}), 400
    else:
        return jsonify({'error': 'Invalid JSON data in request'}), 400



@app.route('/cl', methods=['POST'])
def createLecture():
    if request.is_json:
        data = request.json
        course_name = data.get("course_name")
        name = data.get("name")
        description = data.get("description")
        content = data.get("content")
        duration = data.get("duration")
        resources = data.get("resources")
        owner = data.get("owner")

        if data and course_name and name and description and content and duration and resources:
            create_status = mongodb.createLecture(course_name, name, description, content, duration, resources, owner)
            return jsonify({}), 200 if create_status else 400
        else:
            return jsonify({'error': 'Invalid data. All fields are required.'}), 400

    else:
        return jsonify({'error': 'Invalid JSON data in request'}), 400




    

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=60000)

