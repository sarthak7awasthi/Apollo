import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/Firebase/AuthContext';
import { Home } from './components/Home/Home';
import  Login  from './components/Login';
import CourseDetail from './components/CourseDetail';

            //<Routes>
            //    <Route path="/login" element={<Login />} />
            //</Routes>

function App() {
    const { currentUser } = useAuth();

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" replace />} />
                <Route path="/course/:courseId" element={<CourseDetail />} /> 
            </Routes>
        </div>
    );
}

export default App;
