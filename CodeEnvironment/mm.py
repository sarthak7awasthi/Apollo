# import os

# import subprocess
# from flask_cors import CORS
# from db import Mongo


# URI = "mongodb+srv://bruteforceprogrammer:Wbm6pk9tHbqRfeL@codefest24.xgn5rtg.mongodb.net/?retryWrites=true&w=majority"

# if not URI:
#     raise RuntimeError("MONGO DB URI NOT SET")

# mongodb = Mongo(URI, "Codefest24")

# mongodb.setCollection("Users")
# some = mongodb.createUser("Sarthak")
# mongodb.createCourse('name', 'owner', 'language', 'description')
# mongodb.createLecture('course_name', 'name', 'description', 'content', 'duration', 'resources', 'owner')
# mongodb.createAssignment( 'name', 'description', 'duration', 'agents', 'course_name', 'lecture_name', 'owner')