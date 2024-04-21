import './teacherScreen.css';
import { getCourseInfo } from '../api.js'; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import AddClassesImg from '../assets/AddClassesImg.png';
import BookIcon from '../assets/BookIcon.png';
import TeacherNav from './navbar.jsx';
import StudentAccordian from './studentAccordian.jsx';


export default function TeacherScreen() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleMakeModulePage = () => {
        navigate('/makeModule');
    }




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
    // to map all the classes in the left menu
    const classList = [
        {
          classImage: './assets/class-img-1.png',
          className: 'MATH 101',
          professor: 'Prof. John Doe'
        },
        {
          classImage: '../assets/class-img-2.png',
          className: 'CHEM 121',
          professor: 'Prof. Jane Smith'
        },
        {
          classImage: '../assets/class-img-3.png',
          className: 'PHYS 101',
          professor: 'Prof. Alice Johnson'
        },
        {
            classImage: '../assets/class-img-4.png',
            className: 'CS 164',
            professor: 'Prof. Bob Brown'
        },
        
      ];

    const teacherInfo = {
        Name: 'Joana Stuart',
        ID: '123456789',
        studentImg: '../assets/TeacherPhoto.png'
    }

    return (
        // <div>
        //     Student Page
        //     <button onClick={handleAssignmentPage}> Assignment Page</button>
        // </div>
        <div className='studentDash_container'>
            <div className='student_dash'>
                <div className='left_bar_container'>
                    <img src={Logo} className='logoImg' alt='Logo' />

                    <div style={{ 
                        width: '80%', 
                        height: '2px', 
                        backgroundColor: 'black',
                        margin: '10px 0',
                        opacity: '0.2',
                    }}></div>

                    <div className='leftbar_classes_container'>
                        {/* <div className='class_1'>
                            <div className='classImg'>
                                <img src={ClassImg_4} alt='Class Image' />
                            </div>
                            <div className='class_name'>
                                <p style={{fontWeight: 900}}> CS 172 </p>
                                <p style={{fontWeight: 200}}> Prof. John Doe </p>
                            </div>
                        </div> */}
                        {courses.map((classItem, index) => (
                            <div className='class_1' key={index}>
                                <div className='classImg'>
                                <img src={BookIcon} alt='Class Image' />
                                </div>
                                <div className='class_name'>
                                    <p style={{fontWeight: 900}}> {classItem.name} </p>
                                    <p style={{fontWeight: 200}}> {classItem.professor} </p>
                                </div>
                            </div>
                        ))}
                        <div className='addClassesBtn'>
                            <img src={AddClassesImg} alt='Add Classes' />
                            <p> Add Classes </p>
                        </div>
                    </div>
                </div>
                <div className='right_pannel'>
                    <TeacherNav studentInfo={teacherInfo}/>
                    <div className='right_component_plaveholder'>
                        Placeholder for teacher comp
                    </div>
                </div>
            </div>
        </div>
    );
}