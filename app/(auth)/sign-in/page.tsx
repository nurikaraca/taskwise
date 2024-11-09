import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const SignIn = () => {
  return (
    <div className='flex justify-center items-center h-screen '>
      <section className=' flex flex-col'>
       
             <div className="">
              <LoginForm/>
             </div>
      </section>
    </div>
  )
}

export default SignIn

