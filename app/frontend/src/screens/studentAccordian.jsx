import './StudentAccordian.css';
import React, { useState } from 'react';
import DropArrow from '../assets/DropArrow.png';
import { useNavigate } from 'react-router-dom';

export default function StudentAccordian({ lectureNumber, lectureName, lectureContent, courseName }) {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const navigate = useNavigate();
    console.log(courseName)
    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
        console.log('Content Visibility Toggled');
    }

    return (
        <div className='student_accordian_container'>
            <div className='lecture_container'>
                <div className='lecture_title' onClick={toggleContentVisibility}>
                    <div className='lecture_title_arrow'>
                        <img src={DropArrow} alt='Drop Arrow' />
                    </div>
                    <div className='lecture_title_text'>
                        <p className='lecture_title_number'> {lectureNumber} </p>
                        <p className='lecture_title_name'> {lectureName} </p>
                    </div>
                </div>

                {isContentVisible && (
                    <div className='lecture_content'>
                        <div className='lecture_content_text'>
                            {lectureContent}
                        </div>
                        <div className='lecture_content_button'>
                            <button className='lecture_content_button_view' onClick={()=>{
                                navigate(`/lecturePage/${courseName}/${lectureNumber}`)
                            }}> Begin Lecture </button>
                        </div>
                    </div>
                )}
                {/* <div className='lecture_content'>
                    <div className='lecture_content_text'>
                        The chapter on "Programming Languages" in CS 164 Introduction to Programming Concepts explores the fundamental concepts and characteristics of various programming languages. It delves into the role of programming languages in software development and their impact on solving computational problems efficiently.
                    </div>
                    <div className='lecture_content_button'>
                        <button className='lecture_content_button_view'> Behin Lecture </button>
                    </div>
                </div> */}

            </div>
        </div>
    );
}