import React from "react";
import { useNavigate } from 'react-router-dom';

export default function TeacherScreen() {

    const navigate = useNavigate();

    const handleClassPage = () => {
        navigate('/makeModule');
    }

    return (
        <div>
            Teacher Page
            <button onClick={handleClassPage}> Make Module</button>
        </div>
    );
}