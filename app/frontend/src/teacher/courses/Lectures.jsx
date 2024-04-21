import React from 'react';
import './LecturePage.css';

const LecturesPage = ({ courseName, lectures }) => {
  return (
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
  );
};

export default LecturesPage;
