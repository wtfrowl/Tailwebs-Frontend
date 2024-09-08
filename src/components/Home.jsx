import { useContext, useEffect, useState } from 'react';
import { TeacherContext } from '../context/TeacherContext';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import Popup from './Popup'

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [refresh,setRefresh]=useState('');
  const { students, fetchStudents, logout } = useContext(TeacherContext);
  const [openId, setOpenId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id); // Toggle dropdown for the current item
  };

  const handleLogout = () => {
    logout();

  };
  useEffect(() => {
    fetchStudents().catch(error => {
      console.error('Error fetching students:', error);
    });
  }, [refresh]);

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    console.log("Editing student:", student); // Debugging line
    setIsEdit(true);
    setCurrentStudent(student);
    setShowModal(true);
  };

  const addStudent = async (student) => {
    try {
      const response = await fetch("http://localhost:3333/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (response.ok) {
       setRefresh(Math.random().toString(36).substring(2, 8));
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const response = await fetch(`http://localhost:3333/api/students/${student._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (response.ok) {
        setRefresh(Math.random().toString(36).substring(2, 8));
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3333/api/students/${studentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
           setRefresh(Math.random().toString(36).substring(2, 8));
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };





  return (
     <div className="max-w-5xl mx-auto py-10">
      <div className='flex justify-between'>
        <div className="text-red-500 text-2xl font-semibold">tailwebs.</div>
        <div className="space-x-8">
          <a href="#" className="text-gray-600 font-medium hover:text-black">Home</a>
          <a href="#" className="text-gray-600 font-medium hover:text-black" onClick={handleLogout}>Logout</a>
        </div>
        </div>
    <div className="max-w-5xl mx-auto py-10">
      
    {/* Table */}
    <div className="bg-white shadow-md rounded-lg">
      {students && students.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Marks</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id}>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white text-sm font-semibold">
                    {student.name.charAt(0)}
                  </span>
                  <span className="text-gray-700">{student.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{student.subject}</td>
                <td className="px-6 py-4 text-gray-600">{student.marks}</td>
                <td className="px-6 py-4">
                <div className="relative inline-block text-left">
      <button
        className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none transition"
        onClick={() => toggleDropdown(student._id)}
      >
      <IoMdArrowDropdownCircle />
      </button>
      <div
        className={`z-10 origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${openId === student._id ? 'block' : 'hidden'}`}
      >
        <div className="py-1">
          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition text-left"
            onClick={() => {
              handleEdit(student);
              setOpenId(null); // Close the dropdown after an action
            }}
          >
            Edit
          </button>
          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition text-left"
            onClick={() => {
              deleteStudent(student._id);
              setOpenId(null); // Close the dropdown after an action
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="px-6 py-4 text-gray-600">No students found</p>
      )}
    </div>

    {/* Action Buttons */}
    <div className="mt-6 flex gap-4">
      <button onClick={handleAdd} className="px-6 py-2 bg-black text-white rounded-md shadow hover:bg-gray-800 transition">
        Add
      </button>
      <button onClick={handleLogout} className="px-6 py-2 bg-black text-white rounded-md shadow hover:bg-gray-600 transition">
        Logout
      </button>
    </div>

    {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20" 
          />
          <div 
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <Popup
              show={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={isEdit ? updateStudent : addStudent}
              studentData={currentStudent}
              isEdit={isEdit}
            />
          </div>
        </>
      )}
  </div></div>
  );
};

export default Home;
