
import LoginForm from '@/components/auth/LoginForm'
const SignIn = () => {
  return (
    <div className="h-full flex justify-center items-center bg-cover bg-center w-full relative">
      <div className=" bg-opacity-70  rounded-xl  w-full md:w-[20rem] lg:w-[28rem] xl:w-[30rem]   sm:mt-28 md:mt-16  ">
        <LoginForm />
      </div>
    </div>
  );
};

export default SignIn;


