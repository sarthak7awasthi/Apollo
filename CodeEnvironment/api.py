import os
from flask import Flask, request, make_response, jsonify
from db import Mongo

URI = os.environ.get("URI")
if not URI:
    raise RuntimeError("MONGO DB URI NOT SET")

mongodb = Mongo(URI, "Codefest24")

app = Flask(__name__)


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


#def createLecture(self, course_name: str, name: str, description: str, content: str, duration: int, resources: list):


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
            if create_status:
                return jsonify({}), 200 if create_status else 400
        else:
            return jsonify({'error': 'Invalid data. All fields are required.'}), 400

    else:
        return jsonify({'error': 'Invalid JSON data in request'}), 400




    
if __name__ == '__main__':
    app.run(debug=True)
