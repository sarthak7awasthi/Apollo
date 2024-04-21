import './studentScreen.css';

import React from "react";
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png';

import StudentNav from './navbar.jsx';


export default function StudentScreen() {

    const navigate = useNavigate();

    const handleAssignmentPage = () => {
        navigate('/assignmentPage');
    }

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
        }

      ];

    const studentInfo = {
        Name: 'Joana Stuart',
        ID: '123456789',
        studentImg: '../assets/UserPhoto.png'
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
                        {classList.map((classItem, index) => (
                            <div className='class_1' key={index}>
                                <div className='classImg'>
                                    <img src={classItem.classImage} alt='Class Image' />
                                </div>
                                <div className='class_name'>
                                    <p style={{fontWeight: 900}}> {classItem.className} </p>
                                    <p style={{fontWeight: 200}}> {classItem.professor} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='right_pannel'>
                    <StudentNav studentInfo={studentInfo}/>
                </div>
            </div>
        </div>
    );
}