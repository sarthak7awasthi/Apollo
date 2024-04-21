import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllCourses, getUsersCourses, getCourseInfo, getUser } from '../../api';
import { CourseCard } from '../CourseCard/CourseCard';

export const Home = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            // This now directly sets state for all courses fetched via the dedicated API endpoint
            const response = await getAllCourses();
          console.log(response);
            const coursesData = response.map(id => ({ id, name: 'Loading...' }));
            const user = await getUser("erick");
          console.log(user);
            setCourses(coursesData); // Assume this is an array of course IDs initially

            // Fetch additional data for each course ID
            const coursesWithDetails = await Promise.all(coursesData.map(async (course) => {
                const details = await getCourseInfo(course.id);
                return { ...course, ...details }; // Merge additional details into the course data
            }));
            setCourses(coursesWithDetails); // Update state with detailed course information
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {courses.length > 0 ? (
                <div>
                    <h2>Courses</h2>
                    {courses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <p>Loading courses...</p>
            )}
        </div>
    );
};
