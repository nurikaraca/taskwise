import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const SignIn = () => {
  return (
    <div className='relative flex justify-center items-center h-full bg-cover bg-center' >
    <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-md"></div>
    <section className="relative z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </section>
  </div>

  )
}

export default SignIn

