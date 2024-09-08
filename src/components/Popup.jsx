// Modal component

import { useEffect, useState } from "react";
// Styles for the modal
import { FaRegUser } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
// eslint-disable-next-line react/prop-types
const Popup = ({ show, onClose, onSubmit, studentData, isEdit }) => {
    const [student, setStudent] = useState(studentData || { name: "", subject: "", marks: "" });
  
    // Update student data when modal opens for edit
    useEffect(() => {
      if (studentData) {
        setStudent(studentData);
      }
    }, [studentData]);
  
    const handleSubmit = () => {
      onSubmit(student);
      onClose();  // Close the modal after submit
    };
  
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <div>
          {/* <h3>{isEdit ? "Edit Student" : "Add Student"}</h3> */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-1 block font-medium text-gray-700">Name</label>
            <div className="relative flex items-center justify-center">
              <span className="absolute left-3  text-gray-400 ">
              <FaRegUser />
              </span>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="Student Name"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="mb-1 block font-medium text-gray-700">Subject</label>
            <div className="relative flex items-center justify-center">
            <span className="absolute left-3  text-gray-400 ">
            <IoBookSharp />
              </span>
              <input
                type="text"
                id="subject"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="Subject"
                value={student.subject}
                onChange={(e) => setStudent({ ...student, subject: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="marks" className="mb-1 block font-medium text-gray-700">Marks</label>
            <div className="relative flex items-center justify-center">
            <span className="absolute left-3  text-gray-400 ">
            <GrScorecard />
              </span>
              <input
                type="text"
                id="marks"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="Marks"
                value={student.marks}
                onChange={(e) => setStudent({ ...student, marks: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 w-full">
            <button
              onClick={handleSubmit}
              className="rounded-md bg-gray-900 px-6 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
            >
              {isEdit ? "Update" : "Add"}
            </button>
            {/* <button onClick={onClose} className="rounded-md bg-gray-900 px-6 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50">Close</button> */}
          </div>
        </div>
      </div>
    </div>
     );
 };

  export default Popup;