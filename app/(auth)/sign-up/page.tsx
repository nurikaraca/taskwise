import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const SingUp = () => {
  return (
    <div className='flex justify-center items-center h-screen '>
      <section className=' flex flex-col'>
       
             <div className="">
              <RegisterForm />
             </div>
      </section>
    </div>
  )
}

export default SingUp