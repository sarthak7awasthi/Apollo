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

    #need assignments table

    def createLecture(self, course_name: str, name: str, description: str, content: str, duration: int, resources: list, owner: str) -> bool:
        course_id = None
        course = None
        course_collection = self.getCollection("Courses")
        try:
            course = course_collection.find_one({'name': course_name, 'owner': owner})
            print(course)
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
                    "resources": resources
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



#insert one vs insert many

LECTURES = {}

if __name__ == "__main__":   
    mongodb = Mongo(os.environ.get("URI"), "Codefest24")
    mongodb.createCourse("tc2", "me", ["en", "fr"], "description2")
