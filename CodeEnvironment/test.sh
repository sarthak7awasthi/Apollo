#!/bin/bash
#curl -X GET http://localhost:60000/getAssignment -d '{
#"aid": "66246770b29330c331f235b7"
#}' -H "Content-Type: application/json" -w "%{http_code}"
#exit 0

if [ $# -eq 0 ]; then
  echo "Please provide a command-line argument."
  exit 1
fi

case $1 in
  "cc")
    #add course
    curl -X POST http://localhost:60000/cc -d '{
    "name": "My Course 2",
    "owner": "erick",
    "language": "en",
    "description": "My first course"
    }' -H "Content-Type: application/json" -w "%{http_code}"
    ;;
  "cu")
    #add user
    curl -X POST http://localhost:60000/cu -d '{
    "name": "erick"
    }' -H "Content-Type: application/json" -w "%{http_code}"
    ;;
  "cl")
    #add lecture
    curl -X POST http://localhost:60000/cl -d '{
    "course_name": "My Course 1",
    "owner": "erick",
    "name": "Lecture 1",
    "description": "Intro to python 3",
    "content": "<h1>Something</h1>",
    "duration": 10,
    "resources": [1,2,3]
    }' -H "Content-Type: application/json" -w "%{http_code}"
    ;;
  "ca")
    #add assignment
    curl -X POST http://localhost:60000/ca -d '{
    "name": "assignment 1",
    "description": "Assignment 1 description",
    "duration": 1,
    "agents": "asdf",
    "course_name": "My Course 1",
    "lecture_name": "Lecture 1",
    "owner": "erick"
    }' -H "Content-Type: application/json" -w "%{http_code}"
    ;;

esac
exit 0

#curl -X POST http://localhost:5000/cc -d '{
#"name": "Course2",
#"owner": "John",
#"language": "Python",
#"description": "Introduction to Programming Languages"
#}' -H "Content-Type: application/json" -w "%{http_code}"

#curl -X POST http://localhost:5000/cl -d '{ "course_name": "Course2",
#"owner": "John",
#"name": "Lecture 1",
#"description": "Intro to python",
#"content": "<h1>Something</h1>",
#"duration": 10,,
#"resources": [1,2,3],
#}' -H "Content-Type: application/json" -w "%{http_code}"


        #course_name = data.get("course_name")
        #name = data.get("name")
        #description = data.get("description")
        #content = data.get("content")
        #duration = data.get("duration")
        #resources = data.get("resources")
        #owner = data.get("owner")
        #







#  def createAssignment(self, name: str, description: str, duration: int, agents: list, course_name: str, lecture_name: str, owner: str) -> bool:


