

// import LoginForm from '@/components/auth/LoginForm'


// const SignIn = () => {
//   return (
    
//     <div className='relative flex justify-center items-center h-full  bg-cover bg-center w-[30rem]' >
//     <div className="absolute inset-0  opacity-60 backdrop-blur-md"></div>
//     <section className="relative z-10">
//       <div className=" p-8 rounded-lg shadow-lg">
//         <LoginForm />
//       </div>
//     </section>
//   </div>
 
//   )
// }

// export default SignIn

import LoginForm from '@/components/auth/LoginForm'
const SignIn = () => {
  return (
    <div className="h-full flex justify-center items-center bg-cover bg-center w-full relative">
      <div className=" bg-opacity-70  rounded-xl  w-full md:w-[20rem] lg:w-[28rem] xl:w-[30rem]  mt-16 sm:mt-28 md:mt-16 xl:mt-32 ">
        <LoginForm />
      </div>
    </div>
  );
};

export default SignIn;


