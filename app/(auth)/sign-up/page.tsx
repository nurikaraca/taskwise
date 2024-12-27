
import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const SingUp = () => {
  return (

    <div className="h-full flex justify-center items-center bg-cover bg-center w-full relative">
    <div className=" bg-opacity-70  rounded-lg shadow-lg w-full  md:w-[20rem] lg:w-[28rem] xl:w-[30rem]  mt-1  sm:mt-6  md:mt-16">
    <RegisterForm />
    </div>
  </div>
    
  )
}

export default SingUp

{/* <div className='flex justify-center items-center h-screen '>
      <section className=' flex flex-col'>
       
             <div className="">
              <RegisterForm />
             </div>
      </section>
    </div> */}