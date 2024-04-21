import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail() {
    const { courseId } = useParams(); // Get courseId from URL parameters
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:60000/getCourseInfo?cid=${courseId}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Failed to fetch course details:', error);
            }
        };

        fetchCourse();
    }, [courseId]);  // Depend on courseId to refetch when it changes

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            {/* Render more course details as needed */}
        </div>
    );
}

export default CourseDetail;
