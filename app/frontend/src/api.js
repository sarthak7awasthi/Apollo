import {axios} from 'axios';

const getAllCourses = async () => {
  const res = await axios.get("https://localhost:6000");
};
