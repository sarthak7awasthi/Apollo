import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './course.css'

const CreateCourse = () => {
  const [lectureName, setLectureName] = useState('');
  const [resources, setResources] = useState([]);
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');

  const Navigate = useNavigate(); 

  const handleCreateLecture = async () => {
    try {
      // Make a POST request to create the lecture
      const response = await fetch('/api/lectures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lectureName,
          resources,
          description,
          language
        }),
      });
      
      if (response.ok) {
        Navigate('/Courses');



        // look at this ---->>


        // Navigate.push('/success');
      } else {
        console.error('Failed to create lecture');
      }
    } catch (error) {
      console.error('Failed to create lecture', error);
    }
  };

  const handleCancel = () => {
    // Redirect back to home screen
    Navigate('/Courses');
  };

  return (
    <div className="container">
      <h1>Create Course</h1>
      <form className="form">
        <div className="form-group">
          <label className="label">Course Name:</label>
          <input
            className="input"
            type="text"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Language:</label>
          <input
            className="input"
            type="text"
            value={language}
            onChange={(e) => setLectureName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Upload Resources:</label>
          <input
            className="input"
            type="file"
            multiple
            onChange={(e) => setResources(Array.from(e.target.files))}
          />
        </div>
        <div className="form-group">
          <label className="label">Description:</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="button-group">
          <button className="button" type="button" onClick={handleCreateLecture}>
            Create Course
          </button>
          <button className="button cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
