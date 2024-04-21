import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursesList from './teacher/courses/CoursesList';
import LoginScreen from './screens/loginScreen';
import StudentScreen from './screens/studentScreen';
import TeacherScreen from './screens/teacherScreen';
import MakeModuleScreen from './screens/makeModuleScreen';
import AssignmentScreen from './screens/assignmentScreen';


import LecturesPage from './teacher/courses/Lectures';
import CustomEditor from './codeIDE/CustomEditor';
import QuizUI from './quizTaker/Quiz';

import CreateCourse from './teacher/courses/CreateCourse';
import CreateLecture from './teacher/courses/CreateLecture';

function App() {

  const lecturesData = [
    {
      lectureName: 'Introduction to React',
      lectureDescription: 'This lecture covers the basics of React.js',
      lectureDuration: '1 hour',
      lectureResources: ['slides.pdf', 'code.zip'],
    },
    {
      lectureName: 'State Management in React',
      lectureDescription: 'Learn how to manage state in React applications',
      lectureDuration: '45 minutes',
      lectureResources: ['video.mp4', 'code.zip'],
    }
  ];


  const coursesData = [
    {
      lectureName: 'Introduction to MongoDB',
      lectureDescription: 'This lecture covers the basics of React.js',
      lectureDuration: '1 hour',
      lectureResources: ['slides.pdf', 'code.zip'],
    },
    {
      lectureName: 'State Management in Java',
      lectureDescription: 'Learn how to manage state in React applications',
      lectureDuration: '45 minutes',
      lectureResources: ['video.mp4', 'code.zip'],
    }
  ];
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/studentPage" element={<StudentScreen />} />
        <Route path="/teacherPage" element={<TeacherScreen />} />
        <Route path="/makeModule" element={<MakeModuleScreen />} />
        <Route path="/assignmentPage" element={<AssignmentScreen />} />



        <Route path="/Lectures" element={<LecturesPage courseName="Advanced React Course" lectures={lecturesData} />} />
        <Route path="/editor" element={<CustomEditor />} />
        <Route path="/quiz" element={<QuizUI />} />

        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/CreateLecture" element={<CreateLecture />} />
        <Route path="/Courses" element={<CoursesList courseName="Advanced React Course" lectures={coursesData}/>} />


        


      

      </Routes>
    </div>
  );
}



export default App;
