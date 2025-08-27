import React from 'react'

const Login = () => {
  return (
   <section className='h-screen flex items-center justify-center'>
  <div className='max-w-sm border shadow bg-white mx-auto p-8'>
    <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>

    {/* form */}

    <form className='space-y-5 max-w-sm mx-auto pt-8'>
        <input type="Email" name ="Email" id="Email" 
        placeholder='Email Address' required
        className='w-full bg-gray-100 focus-outline-none px-5 py-3'
        />

        <input type="Password" name ="Password" id="Password" 
        placeholder='Password' required
        className='w-full bg-gray-100 focus-outline-none px-5 py-3'
        />
    </form>
  </div>
</section>

  )
}

export default Login