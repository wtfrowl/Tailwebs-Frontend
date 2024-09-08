import  { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  // On app load, check for an existing token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTeacher({ token });
    }
  }, []);

   // Logout function
   const logout = () => {
    setTeacher(null);
    localStorage.removeItem('token');
    setError('')
    Navigate('/')
  };

  // Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:3333/api/auth/login', { username, password });
      setTeacher(res.data.teacher); // Now storing teacher instead of user
      localStorage.setItem('token', res.data.token);
      setError('')
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  // Signup function
  const signup = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:3333/api/auth/signup', { username, password });
      setTeacher(res.data.teacher); // Now storing teacher instead of user
      localStorage.setItem('token', res.data.token);
      setError('')
    } catch (err) {
      setError('Teacher already exists, Login');
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3333/api/students', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStudents(res.data);
     
    } catch (err) {
      setError('Failed to fetch students');
    }
  };


 

  return (
    <TeacherContext.Provider value={{ teacher, login, signup, logout,fetchStudents,students, error,setTeacher,setError }}>
      {children}
    </TeacherContext.Provider>
  );
};
