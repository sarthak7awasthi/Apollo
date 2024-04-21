import './navbar.css';

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
                Search
            </div>
            <div className='navButtons'>
                Grades 
                Content
                Help 
            </div>
        </div>
    )
}