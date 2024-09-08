import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { TeacherProvider } from './context/TeacherContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import './index.css';

function App() {
  return (
 
    <TeacherProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Home is now a protected route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
 
    </TeacherProvider>
  );
}

export default App;
