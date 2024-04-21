import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginScreen from './screens/loginScreen';
import StudentScreen from './screens/studentScreen';
import TeacherScreen from './screens/teacherScreen';
import MakeModuleScreen from './screens/makeModuleScreen';
import AssignmentScreen from './screens/assignmentScreen';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArKDX_pVh40E7P1ptXaTkpeyI79qerb0c",
  authDomain: "phillycodefest2024.firebaseapp.com",
  projectId: "phillycodefest2024",
  storageBucket: "phillycodefest2024.appspot.com",
  messagingSenderId: "493007053222",
  appId: "1:493007053222:web:b76e50b8181c623805af67",
  measurementId: "G-KNX9E4E3S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/studentPage" element={<StudentScreen />} />
        <Route path="/teacherPage" element={<TeacherScreen />} />
        <Route path="/makeModule" element={<MakeModuleScreen />} />
        <Route path="/assignmentPage" element={<AssignmentScreen />} />
      </Routes>
    </div>
  );
}



export default App;
