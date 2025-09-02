import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice'; // ✅ Make sure this import exists

const Login = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();   // ✅ lowercase, not Navigate

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      const { token, user } = response;

      // ✅ Save user in redux
      dispatch(setUser({ user, token }));

      // ✅ Clear error if login is successful
      setMessage("");

      alert("Login successful");
      navigate("/");   // ✅ correct navigation
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Please provide valid email and password");
    }
  }

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow bg-white mx-auto p-8'>
        <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>

        {/* form */}
        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
          <input
            type="email"
            name="Email"
            id="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          <input
            type="password"
            name="Password"
            id="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          {message && <p className="text-red-500">{message}</p>}

          <button
            type='submit'
            disabled={loginLoading}
            className='w-full bg-[#ed3849] text-white hover:bg-indigo-500 font-medium py-3 rounded-md'
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className='my-5 italic text-sm text-center'>
          Don't have an account?
          <Link to="/register" className='text-[red] px-1 underline'>Register</Link>
          here.
        </p>
      </div>
    </section>
  )
}

export default Login
