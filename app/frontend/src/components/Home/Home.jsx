import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Corrected import

import { getUsersCourses, getCourseInfo } from '../../api';

export const Home = () => {
    const [courses, setCourses] = useState(null); // State to hold the courses data

    // Function to fetch courses
    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:60000/getCourses");
            setCourses(response.data); // Set the courses data to state
            console.log("Fetched Courses:", response.data); // Logging the data
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    // useEffect to run once on component mount
    useEffect(() => {
        getUsersCourses("erick");
        getCourseInfo("6624b2482b5f15f584fc1ecc");
        fetchCourses();
    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <div>
            <h1>Home</h1>
            {courses ? (
                <div>
                    <h2>Courses</h2>
                    {/* Assuming courses is an array, map over it and display course data */}
                    {courses.map(course => (
                        <p key={course.id}>{course.name}</p> // Adjust according to your actual data structure
                    ))}
                </div>
            ) : (
                <p>Loading courses...</p>
            )}
        </div>
    );
};
