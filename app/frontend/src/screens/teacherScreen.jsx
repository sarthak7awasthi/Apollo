import './teacherScreen.css';
import { getCourseInfo, createCourse  } from '../api.js'; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import AddClassesImg from '../assets/AddClassesImg.png';
import BookIcon from '../assets/BookIcon.png';
import TeacherNav from './navbar.jsx';
import StudentAccordian from './studentAccordian.jsx';
import Modal from './Modal.jsx';


export default function TeacherScreen() {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: '',
        owner: '',
        language: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleMakeModulePage = () => {
        navigate('/makeModule');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleCreateCourse = async () => {
        try {
            const { name, owner, language, description } = newCourse;
            const success = await createCourse(name, owner, language, description);
            if (success) {
                // Refresh courses after creating a new course
                // You might need to update this logic based on your requirements
                fetchCourses();
                setShowModal(false);



                console.log("done");
                // Reset newCourse state
                setNewCourse({
                    name: '',
                    owner: '',
                    language: '',
                    description: ''
                });
            } else {
                // Handle error scenario if needed
            }
        } catch (error) {
            console.log(error)
        }
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
        <div className='studentDash_container'>
            <div className='student_dash'>
                <div className='left_bar_container'>
                    <img src={Logo} className='logoImg' alt='Logo' />

                    <div className='separator'></div>

                    <div className='leftbar_classes_container'>
                        {courses.map((classItem, index) => (
                            <div className='class_1' key={index}>
                                <div className='classImg'>
                                    <img src={BookIcon} alt='Class Image' />
                                </div>
                                <div className='class_name'>
                                    <p className='class_title'>{classItem.name}</p>
                                    <p className='professor_name'>{classItem.professor}</p>
                                </div>
                            </div>
                        ))}
                        <Modal show={showModal} onClose={() => setShowModal(false)}>
                            <form onSubmit={handleCreateCourse} className='add_course_form'>
                            <h2 style={{ marginBottom: '20px', color: '#6c757d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Add Course</h2>
<input type="text" name="name" placeholder="Course Name" value={newCourse.name} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }} />
<input type="text" name="owner" placeholder="Owner" value={newCourse.owner} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }} />
<input type="text" name="language" placeholder="Language" value={newCourse.language} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }} />
<textarea name="description" placeholder="Description" value={newCourse.description} onChange={handleInputChange} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px', resize: 'vertical', minHeight: '100px' }}></textarea>
<button type="submit" style={{ padding: '12px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Create</button>

                            </form>
                        </Modal>
                        <div className='addClassesBtn' onClick={() => setShowModal(true)}>
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
