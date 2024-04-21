import React, { useState, useEffect } from 'react';
import './courseList.css';
import { useNavigate } from 'react-router-dom';
import '../../api';
import StudentNav from '../../screens/navbar';
import axios from 'axios';

import Logo from './../../assets/Logo.png';
import { getCourseInfo } from '../../api';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const Navigate = useNavigate();

  const studentInfo = {
    Name: 'Joana Stuart',
    ID: '123456789',
    studentImg: Logo
  };

  const handleCreate = () => {
    Navigate('/CreateCourse');
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:60000/getCourses");
        const courseIds = res.data;
        
        // Fetch additional course info for each course ID
        const courseInfoList = await Promise.all(courseIds.map(async (courseId) => {
          return await getCourseInfo(courseId);
        }));
  
        // Set the courses state with the fetched course info
        setCourses(courseInfoList);
  
        console.log("res", courseInfoList);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);
  

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:60000/getCourses");
//         setCourses(res.data);
//         res.data.map(async (courseId)=>{
//             setCourses(...courses, await getCourseInfo(courseId))
//         })

//         console.log("res", courses)
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       }
//     };
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://127.0.0.1:60000/getCourses");
//         console.log("res", res)
//         setCourses(res);
//         console.log("res", res)
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       }
//     };
//     fetchCourses();

//     const courseIds = courses;

// // Function to fetch additional course info for each course ID
//         const fetchCourseInfo = async () => {
//         const courseInfoList = [];
        
//         for (const courseId of courseIds) {
//             try {
//             const courseInfo = await getCourseInfo(courseId);
//             courseInfoList.push(courseInfo);
//             } catch (error) {
//             console.error(`Error fetching course info for course ID ${courseId}:`, error);
//             }
//         }
        
//         // Now courseInfoList contains additional info for each course
//         console.log(courseInfoList);
//         // You can update your UI or state with this courseInfoList
//         };

//         fetchCourseInfo()
//   }, []);

  return (
    <>
      <button onClick={handleCreate}>Create Course</button>
      <div className="studentDash_container">
        <div className="student_dash">
          <div className="left_bar_container">
            <img src={Logo} className="logoImg" alt="Logo" />
            <div className="leftbar_classes_container">
              {courses.map((course, index) => (
                <div className="class_1" key={index}>
                  <div className="classImg">
                    <img src={course.classImage} alt="Class" />
                  </div>
                  <div className="class_name">
                    <p style={{ fontWeight: 900 }}>{course.name}</p>
                    <p style={{ fontWeight: 200 }}>{course.professor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right_pannel">
            <h1>Student Dashboard</h1>
            <StudentNav studentInfo={studentInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesList;
