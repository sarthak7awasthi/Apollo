import './studentScreen.css';

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png';

import StudentNav from './navbar.jsx';
import StudentAccordian from './studentAccordian.jsx';


export default function StudentScreen() {

    const [selectedClass, setSelectedClass] = useState('MATH 101');
    const handleClassChange = (className) => {
        setSelectedClass(className);
        console.log('Selected Class: ', className);
    }
    
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
        },
        
      ];

    const studentInfo = {
        Name: 'Joana Stuart',
        ID: '123456789',
        studentImg: '../assets/UserPhoto.png'
    }

    const lectureList = [
        {
            lectureNumber: '1.1',
            lectureName: 'CS164 Introduction to the Course',
            lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
        },
        {
            lectureNumber: '1.2',
            lectureName: 'CS164 Second Thing',
            lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
        },
        {
            lectureNumber: '1.3',
            lectureName: 'CS164 Third THing',
            lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
        },
        {
            lectureNumber: '1.4',
            lectureName: 'CS164 Fourth Thing',
            lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
        },
        {
            lectureNumber: '1.5',
            lectureName: 'Fifth Thing',
            lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
        },
    ];

    const lectureByClass = {
        'MATH 101': [
            {
                lectureNumber: '1.1',
                lectureName: 'MATH101 Introduction to the Course',
                lectureContent: 'The chapter on "Mathematics" in MATH 101 Introduction to Mathematics explores the fundamental concepts and characteristics of various mathematical concepts. It delves into the role of mathematics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.2',
                lectureName: 'MATH101 Second Thing',
                lectureContent: 'The chapter on "Mathematics" in MATH 101 Introduction to Mathematics explores the fundamental concepts and characteristics of various mathematical concepts. It delves into the role of mathematics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.3',
                lectureName: 'MATH101 Third THing',
                lectureContent: 'The chapter on "Mathematics" in MATH 101 Introduction to Mathematics explores the fundamental concepts and characteristics of various mathematical concepts. It delves into the role of mathematics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.4',
                lectureName: 'MATH101 Fourth Thing',
                lectureContent: 'The chapter on "Mathematics" in MATH 101 Introduction to Mathematics explores the fundamental concepts and characteristics of various mathematical concepts. It delves into the role of mathematics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.5',
                lectureName: 'Math 101 Fifth Thing',
                lectureContent: 'The chapter on "Mathematics" in MATH 101 Introduction to Mathematics explores the fundamental concepts and characteristics of various mathematical concepts. It delves into the role of mathematics in software development and their impact on solving computational problems efficiently.'
            },
        ],
        'CHEM 121': [
            {
                lectureNumber: '1.1',
                lectureName: 'CHEM121 Introduction to the Course',
                lectureContent: 'The chapter on "Chemistry" in CHEM 121 Introduction to Chemistry explores the fundamental concepts and characteristics of various chemical concepts. It delves into the role of chemistry in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.2',
                lectureName: 'CHEM121 Second Thing',
                lectureContent: 'The chapter on "Chemistry" in CHEM 121 Introduction to Chemistry explores the fundamental concepts and characteristics of various chemical concepts. It delves into the role of chemistry in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.3',
                lectureName: 'CHEM121 Third THing',
                lectureContent: 'The chapter on "Chemistry" in CHEM 121 Introduction to Chemistry explores the fundamental concepts and characteristics of various chemical concepts. It delves into the role of chemistry in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.4',
                lectureName: 'CHEM121 Fourth Thing',
                lectureContent: 'The chapter on "Chemistry" in CHEM 121 Introduction to Chemistry explores the fundamental concepts and characteristics of various chemical concepts. It delves into the role of chemistry in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.5',
                lectureName: 'CHEM 121 Fifth Thing',
                lectureContent: 'The chapter on "Chemistry" in CHEM 121 Introduction to Chemistry explores the fundamental concepts and characteristics of various chemical concepts. It delves into the role of chemistry in software development and their impact on solving computational problems efficiently.'
            },
        ],
        'PHYS 101': [
            {
                lectureNumber: '1.1',
                lectureName: 'PHYS101 Introduction to the Course',
                lectureContent: 'The chapter on "Physics" in PHYS 101 Introduction to Physics explores the fundamental concepts and characteristics of various physical concepts. It delves into the role of physics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.2',
                lectureName: 'PHYS101 Second Thing',
                lectureContent: 'The chapter on "Physics" in PHYS 101 Introduction to Physics explores the fundamental concepts and characteristics of various physical concepts. It delves into the role of physics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.3',
                lectureName: 'PHYS101 Third THing',
                lectureContent: 'The chapter on "Physics" in PHYS 101 Introduction to Physics explores the fundamental concepts and characteristics of various physical concepts. It delves into the role of physics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.4',
                lectureName: 'PHYS101 Fourth Thing',
                lectureContent: 'The chapter on "Physics" in PHYS 101 Introduction to Physics explores the fundamental concepts and characteristics of various physical concepts. It delves into the role of physics in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.5',
                lectureName: 'PHYS 101 Fifth Thing',
                lectureContent: 'The chapter on "Physics" in PHYS 101 Introduction to Physics explores the fundamental concepts and characteristics of various physical concepts. It delves into the role of physics in software development and their impact on solving computational problems efficiently.'
            },
        ],
        'CS 164': [
            {
                lectureNumber: '1.1',
                lectureName: 'CS164 Introduction to the Course',
                lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.2',
                lectureName: 'CS164 Second Thing',
                lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.3',
                lectureName: 'CS164 Third THing',
                lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.4',
                lectureName: 'CS164 Fourth Thing',
                lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
            },
            {
                lectureNumber: '1.5',
                lectureName: 'CS 164 Fifth Thing',
                lectureContent: 'The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.'
            },
        ],
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
                            <div 
                                className='class_1' 
                                key={index}
                                onClick={() => handleClassChange(classItem.className)}>
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
                    <div className='right_component_placeholder'>
                        {/* {lectureList.map((lectureItem, index) => (
                            <StudentAccordian 
                                key={index}
                                lectureNumber={lectureItem.lectureNumber}
                                lectureName={lectureItem.lectureName}
                                lectureContent={lectureItem.lectureContent}
                            />
                        ))} */}

                        {selectedClass && lectureByClass[selectedClass]?.map((lectureItem, index) => (
                            <StudentAccordian 
                                key={index}
                                lectureNumber={lectureItem.lectureNumber}
                                lectureName={lectureItem.lectureName}
                                lectureContent={lectureItem.lectureContent}
                            />
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}