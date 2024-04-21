import axios from 'axios';

export const getAllCourses = async () => {
  try{
    const res = await axios.get("http://127.0.0.1:60000/getCourses");
    return res.data;
  }catch (err){
    return {};
  }
};

export const getUsersCourses = async (username) => {
const params = new URLSearchParams({
    name: username
  });
  const url = `http://127.0.0.1:60000/getUsersCourses?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return null;  
  }
}
export const getLectures = async (cid) => {
  const params = new URLSearchParams({ cid });
  const url = `http://127.0.0.1:60000/getLectures?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching lectures:', error);
    return null;  
  }
};

export const getAssignments = async (lid) => {
  const params = new URLSearchParams({ lid });
  const url = `http://127.0.0.1:60000/getAssignments?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return null;  
  }
};

export const getAssignment = async (aid) => {
  const params = new URLSearchParams({ aid });
  const url = `http://127.0.0.1:60000/getAssignment?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching assignment:', error);
    return null;  
  }
};


export const createUser2 = async(username, password) => {
  try {
    const res = await axios.post('/createUser', {username: username, password:password}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Status:', res.status);
    console.log('Data:', res.data);
    if(res.status == 200){
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error:', error.res ? error.res.data : error.message);
    throw error; 
  }
};

export const createCourse = async (name, owner, language, description) => {
  const body = {
    name: name,
    owner: owner,
    language: language,
    description: description
  };
  try {
    const res = await axios.post('http://127.0.0.1:60000/cc', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.status === 200;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const createLecture = async (course_name, name, description, content, duration, resources, owner) => {
  const body = {
    course_name: course_name,
    name: name,
    description: description,
    content: content,
    duration: duration,
    resources: resources,
    owner: owner
  };
  try {
    const res = await axios.post('http://127.0.0.1:60000/cl', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.status === 200;
  } catch (error) {
    console.error('Error creating lecture:', error);
    throw error;
  }
};

export const createAssignment = async (name, description, duration, agents, course_name, lecture_name, owner) => {
  const body = {
    name: name,
    description: description,
    duration: duration,
    agents: agents,
    course_name: course_name,
    lecture_name: lecture_name,
    owner: owner
  };
  try {
    const res = await axios.post('http://127.0.0.1:60000/ca', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.status === 200;
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
};

export const createUser = async (name) => {
  try {
    const res = await axios.post('http://127.0.0.1:60000/cu', { name }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.status === 200;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const getCourseInfo = async (cid) => {
  const params = new URLSearchParams({ cid });
  const url = `http://127.0.0.1:60000/getCourseInfo?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching course info:', error);
    return null;
  }
};

export const getLectureInfo = async (lid) => {
  const params = new URLSearchParams({ lid });
  const url = `http://127.0.0.1:60000/getLectureInfo?${params.toString()}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching lecture info:', error);
    return null;
  }
};

export const getAssignmentInfo = async (aid) => {
  const params = new URLSearchParams({ aid });
  const url = `http://127.0.0.1:60000/getAssignmentInfo?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching assignment info:', error);
    return null;
  }
};

export const getAllUsers = async () => {
  try{
    const res = await axios.get("http://127.0.0.1:60000/getUsers");
    return res.data;
  }catch (err){
    return {};
  }
};


export const getUser= async (name) => {
  const params = new URLSearchParams({ name });
  const url = `http://127.0.0.1:60000/getUser?${params.toString()}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);  
    return response.data;
  } catch (error) {
    console.error('Error fetching assignment info:', error);
    return null;
  }
};



export const editLectureContent = async (lectureId, newContent) => {
  const url = `http://127.0.0.1:60000/editLectureContent`;
  const data = {
    lecture_id: lectureId,
    content: newContent
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Update Response:", response.data);  // Log the response from the server
    return response.data;  // Return the response from the server
  } catch (error) {
    console.error('Error updating lecture content:', error);
    return null;  // Return null or handle error as needed
  }
};
