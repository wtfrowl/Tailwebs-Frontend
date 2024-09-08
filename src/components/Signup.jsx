import { useState, useContext, useEffect } from 'react';
import { TeacherContext } from '../context/TeacherContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { BiLockOpen } from "react-icons/bi";
import { BiSolidShow,BiSolidHide } from "react-icons/bi";
const Signup = () => {
  const { signup, error,teacher,setError} = useContext(TeacherContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  
  useEffect(() => {
    setError('')1
    if (teacher) {
      // Redirect to home page if logged in
      navigate('/home');
    }
  }, [teacher]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const op=await signup(username, password);
   console.log(op)
   setError(op.msg)
  };

  return (
    <div className=" flex flex-col fixed inset-0  items-center justify-center z-50 bg-slate-200">
    <div className='flex flex-col items-center justify-center mb-8'>
  <div className="text-red-500 text-5xl font-semibold">tailwebs.</div>
  </div>
 <div className="w-[650px] rounded-lg bg-white px-40 py-20 shadow-lg ">

 <div className="mb-4">
        <label htmlFor="username" className="mb-1 block font-medium text-gray-700">Username</label>
        <div className="relative flex items-center justify-center">
          <span className="absolute left-3  text-gray-700 ">
        <FaRegUser/>
          </span>
          <input
            type="text"
            id="username"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="mb-1 block font-medium text-gray-700">Password</label>
        <div className="relative flex items-center justify-center">
          <span className="absolute left-3  text-gray-700 ">
          <BiLockOpen />
          </span>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            className="w-full rounded-md border border-gray-300 py-2 px-10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 "
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
           <span className="z-10 absolute right-3 cursor-pointer  text-gray-700 " onClick={togglePasswordVisibility}>
          {isPasswordVisible?<BiSolidHide/>:<BiSolidShow/>}
          </span>
        </div>
      </div>
   
      <p className=' text-right w-full text-blue-600 mb-4'>Forgot Password ?</p>
      <div className="flex justify-center gap-2 w-full">
        <button
          onClick={handleSubmit}
          className="rounded-md bg-gray-900 px-6 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
        >
         Signup
        </button>
  
      </div>
      <p>{error&&error}</p>
      <p className='mt-6 items-center justify-center flex gap-2'>Already Have an Account ? <Link to="/login" > Login</Link></p>
</div>
</div>
  );
};

export default Signup;
