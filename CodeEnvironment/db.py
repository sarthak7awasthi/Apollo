import os
from pymongo import MongoClient

class Mongo:
    def __init__(self, uri: str, db_name: str):
        self.setClient(uri)
        self.setDatabase(db_name)

    def setClient(self, uri: str) -> None:
        try:
            self.__client = MongoClient(uri)
        except Exception as e:
            raise RuntimeError(e)


    def setDatabase(self, db_name: str) -> None:
        if db_name not in self.__client.list_database_names():
            raise ValueError("Database '" + db_name + "' does not exist.")
        self.__db = self.__client[db_name]

    def getCollection(self, collection_name: str):
        if collection_name not in self.__db.list_collection_names():
            raise ValueError("Collection '" + collection_name + "' does not exist in the specified database.")
        return self.__db[collection_name]


#user related
    def createUser(self, username: str) -> bool:
        if username:
            users_collection = self.getCollection("Users")
            try:
                if users_collection.count_documents({"name": username}) == 0:
                    user = {
                            "name": username,
                            "courses": []
                    }
                    users_collection.insert_one(user)
                    return True
            except Exception:
                print("Error creating user")
        return False

    def getUser(self, name: str):
        users_colleciton = self.getCollection("Users")
        user = users_colleciton.find_one({"name": name})
        return user

#course related
    def getCourse(self, user, name: str):
        if user:
            courses = user["courses"]
            return courses.find_one({"name": name})


    def createCourse(self, name: str, owner:str, language:str, description: str) -> bool:

        query = {"name": name, "owner": owner}
        if self.__db['Courses'].count_documents(query) > 0:
            print("A course with the same name and owner already exists.")
            return False

        course = {
                "name":name,
                "owner": owner,
                "language": language,
                "description": description,
                "lectures": [],
                }

        try:
            collection = self.getCollection("Courses")
            collection.insert_one(course)
            return True

        except:
            return False

    def createCourse2(self, name: str, owner:str, language:str, description: str) -> bool:
        user = self.getUser(owner)
        course_collection = self.getCollection("Courses")
        if user:
            if not self.getCourse(user, name):
                course = {
                        "owner": user,
                        "name": name,
                        "description": description,
                        "language": language,
                        "lectures": []
                }
                course = course_collection.insert_one(course)
                user.update_one()
                user["courses"].append(course)
                return True

        return False


    #need assignments table

    def createLecture(self, course_name: str, name: str, description: str, content: str, duration: int, resources: list, owner: str) -> bool:
        course_id = None
        course = None
        course_collection = self.getCollection("Courses")
        try:
            course = course_collection.find_one({'name': course_name, 'owner': owner})
            if course:
                course_id = course['_id']
                query = {"course": course_id, "name": name}
                if self.__db["Lectures"].count_documents(query) > 0:
                    print("A lecture with the same name from the same course already exists.")
                    return False

        except Exception:
            print("could not get course id")
            return False

        try:
            if course:
                course_id = course['_id']
                lecture = {
                        "course": course_id,
                        "name": name,
                        "owner": owner,
                        "description": description,
                        "content": content,
                        "duration": duration,
                        "resources": resources,
                        "assignments": [],
                        }
                lextures_collection = self.getCollection("Lectures")
                res = lextures_collection.insert_one(lecture)
                #insert lecture id into course's lectures array
                course_collection.update_one(
                        {"_id": course_id},
                        {"$push": {"lectures": res.inserted_id}}
                        )

                return True
            else:
                return False
        except Exception as e:
            print(e)
            return False

    def createAssignment(self, name: str, description: str, duration: int, agents: str, course_name: str, lecture_name: str, owner: str) -> bool:
        course_id = None
        lecture_id = None
        course_collection = self.getCollection("Courses")
        lectures_collection = self.getCollection("Lectures")
        assignment_collection = self.getCollection("Assignments")
        try:
            course = course_collection.find_one({'name': course_name, 'owner': owner})
            if course:  
                course_id = course['_id']
                print(course_id)
                print(lecture_name)
                lecture = lectures_collection.find_one({'course': course_id, 'name': lecture_name})
                print(lecture)
                if lecture:
                    lecture_id = lecture['_id']
                    query = {"lecture": lecture_id, "name": name}
                    if self.__db["Assignments"].count_documents(query) > 0:
                        print("An assignment with the same name from the same lecture already exists.")
                        return False
                    assignment = {
                        "name": name,
                        "lecture": lecture_id,
                        "description": description,
                        "durtion": duration,
                        "agents": agents,
                        "owner": owner
                    }
                    res = assignment_collection.insert_one(assignment)
                    lectures_collection.update_one({"_id": lecture_id}, {"$push": {"assignments": res.inserted_id}})
                    return True
        except Exception:
            print("could not get course id")
            return False

        return False

    def getAllCourses(self):
        course_collection = self.getCollection("Courses")
        all_course_ids = course_collection.find({}, {"_id": 1})
        course_ids_list = [course['_id'] for course in all_course_ids]
        return course_ids_list

    def getUsersCourses(self, name):
        course_collection = self.getCollection("Courses")
        courses = course_collection.find({"owner": name})
        course_ids_list = [course['_id'] for course in courses]
        return course_ids_list

    def getLectures(self, course_id):
        courses_collection = self.getCollection("Courses")
        course = courses_collection.find_one({"_id": course_id}, {"lectures": 1})
        if course and 'lectures' in course:
            return course['lectures']
        else:
            return []

    def getAssignments(self, lecture_id):
        lecture_collection = self.getCollection("Lectures")
        lecture = lecture_collection.find_one({"_id": lecture_id}, {"assignments": 1})
        if lecture and 'assignments' in lecture:
            return lecture['assignments']
        else:
            return []

    def getAssignment(self, assignment_id):
        assignment_collection = self.getCollection('Assignments')
        assignment = assignment_collection.find_one({"_id": assignment_id})
        return assignment




# get assignmetns given a id





#insert one vs insert many

#if __name__ == "__main__":   
#    mongodb = Mongo(os.environ.get("URI"), "Codefest24")
#    mongodb.createCourse("tc2", "me", ["en", "fr"], "description2")
