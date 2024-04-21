import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginScreen from './screens/loginScreen';
import StudentScreen from './screens/studentScreen';
import TeacherScreen from './screens/teacherScreen';
import MakeModuleScreen from './screens/makeModuleScreen';
import AssignmentScreen from './screens/assignmentScreen';

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
