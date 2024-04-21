import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LecturePage.css';

const LecturesPage = ({ courseName, lectures }) => {
  const handleCreate = () => {
    Navigate('/Lectures');
};

  const Navigate = useNavigate(); 
  return (<>
    <button onClick={handleCreate}>Create Course</button>
    <div className="container">
      <h1 className="course-title">{courseName}</h1>
      <div className="lecture-cards-container">
        {lectures.map((lecture, index) => (
          <div className="lecture-card" key={index}>
            <h2 className="lecture-name">{lecture.lectureName}</h2>
            <p className="lecture-description">{lecture.lectureDescription}</p>
            <p className="lecture-duration">Duration: {lecture.lectureDuration}</p>
            <div className="resources">
              {lecture.lectureResources.map((resource, resIndex) => (
                <div className="resource" key={resIndex}>
                  <a href={resource} className="resource-link">{resource}</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default LecturesPage;
