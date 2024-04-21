import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LecturesPage from './Lectures';

const CreateLecture = () => {
  const [lectureName, setLectureName] = useState('');
  const [lectureDescription, setLectureDescription] = useState('');
  const [lectureContent, setLectureContent] = useState('');
  const [lectureDuration, setLectureDuration] = useState('');
  const [lectureResources, setLectureResources] = useState([]);
  const [audio, setAudio] = useState('');


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
          lectureDescription,
          lectureContent,
          lectureDuration,
          lectureResources,
          audio,
          lipsync,
        }),
      });
      
      if (response.ok) {
        // Redirect to some other component upon successful creation
        Navigate('/Lectures');
      } else {
        console.error('Failed to create lecture');
      }
    } catch (error) {
      console.error('Failed to create lecture', error);
    }
  };

  const handleCancel = () => {
    // Redirect back to home screen
    Navigate('/Lectures');
  };

  return (
    <div className="container">
      <h1>Create Lecture</h1>
      <form className="form">
        <div className="form-group">
          <label className="label">Lecture Name:</label>
          <input
            className="input"
            type="text"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Lecture Description:</label>
          <textarea
            className="textarea"
            value={lectureDescription}
            onChange={(e) => setLectureDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="label">Lecture Content:</label>
          <textarea
            className="textarea"
            value={lectureContent}
            onChange={(e) => setLectureContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="label">Lecture Duration:</label>
          <input
            className="input"
            type="text"
            value={lectureDuration}
            onChange={(e) => setLectureDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label">Upload Resources:</label>
          <input
            className="input"
            type="file"
            multiple
            onChange={(e) => setLectureResources(Array.from(e.target.files))}
          />
        </div>
        <div className="form-group">
          <label className="label">Upload Resources:</label>
          <input
            className="input"
            type="file"
            multiple
            onChange={(e) => setLectureResources(Array.from(e.target.files))}
          />
        </div>
        {/* Lipsync field can be customized based on the expected input */}
       
        <div className="button-group">
          <button className="button" type="button" onClick={handleCreateLecture}>
            Create Lecture
          </button>
          <button className="button cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLecture;
