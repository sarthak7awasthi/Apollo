import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CourseCard.css';

export function CourseCard({ course }) {
    const [lectures, setLectures] = useState([]);
    const [owner, setOwner] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        const fetchLectures = async () => {
            const lectureDetails = await Promise.all(course.lectures.map(lecture =>
                axios.get(`http://127.0.0.1:60000/getLectureInfo?lid=${lecture.$oid}`)
                    .then(res => res.data)
                    .catch(err => {
                        console.error('Error fetching lecture info:', err);
                        return null; // Handle failed lecture fetch gracefully
                    })
            ));
            setLectures(lectureDetails.filter(lecture => lecture !== null)); // Filter out any failed fetches
        };

        const fetchOwner = async () => {
            try {
                const ownerInfo = await axios.get(`http://127.0.0.1:60000/getUserByID?uid=${course.owner.$oid}`);
                setOwner(ownerInfo.data.name);
            } catch (error) {
                console.error('Error fetching owner info:', error);
            }
        };

        if (course && course.lectures) {
            fetchLectures();
        }
        if (course && course.owner && course.owner.$oid) {
            fetchOwner();
        }
    }, [course]);

    // Function to handle click event
    const handleCardClick = () => {
        navigate(`/course/${course._id.$oid}`);  // Navigate to course detail page
    };

    return (
        <div className="course-card" onClick={handleCardClick}>
            <h3 className="course-title">{course.name}</h3>
            {owner && <h5 className="course-owner">Instructor: {owner}</h5>}
            <p className="course-description">{course.description}</p>
            <ul className="lecture-list">
                {lectures.map((lecture, index) => (
                    lecture ? <li key={index}>{lecture.name || "Lecture without a name"}</li> : null
                ))}
            </ul>
        </div>
    );
}

export default CourseCard;
