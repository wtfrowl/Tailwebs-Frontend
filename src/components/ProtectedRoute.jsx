import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TeacherContext } from '../context/TeacherContext';

const ProtectedRoute = ({ children }) => {
  const { teacher } = useContext(TeacherContext);

  if (!teacher) {
    // If not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  // Otherwise, render the children (i.e., the protected page)
  return children;
};

export default ProtectedRoute;
