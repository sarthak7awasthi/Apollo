import './navbar.css';

import GradeIcon from '../assets/GradesIcon.png';
import ContentIcon from '../assets/BookIcon.png';
import HelpIcon from '../assets/HelpIcon.png';

export default function Navbar({ studentInfo }) {
    
    console.log(studentInfo);
    return (
        <div className="navbar_container">
            <div className='userBox'>
                <div className='userImg'>
                    <img src={studentInfo.studentImg} alt='User' />
                </div>
                <div className='userName'>
                    <p style={{fontWeight: 900}}> {studentInfo.Name} </p>
                    <p style={{fontWeight: 200}}> {studentInfo.ID} </p>
                </div>
            </div>
            <div className='searchBox'>
                <input className='searchBar' type='text' placeholder='Search course content...' />
            </div>
            <div className='navButtons'>
                <div className='gradeButton'>
                    <img src={GradeIcon} alt='Grades' />
                    <p> Grades </p>
                </div>
                <div className='gradeButton'>
                    <img src={ContentIcon} alt='Content' />
                    <p> Course </p>
                </div>
                <div className='gradeButton'>
                    <img src={HelpIcon} alt='Help' />
                    <p> Help </p>
                </div>
            </div>
        </div>
    )
}