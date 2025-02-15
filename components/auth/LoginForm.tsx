"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "@geist-ui/icons";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/actions/auth";
import LoginGoogle from "./LoginGoogle";
import LoginGithub from "./LoginGithub";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 
  const onSubmit = async (data: FormData) => {

    try {
    
      console.log("data" , data)
      const result = await loginWithCreds(data);
      console.log("result" , result)
      console.log("result" , result.error)
      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        router.push("/");  
      }
      
    } catch (error) {
      console.error("Login error:", error);
    }
  };



  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <div className="flex   bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText    flex-col items-center  text-xl p-2 md:border border-slate-600 space-y-2  w-full">
      <h1 className="  mb-2 ">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                    <Button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-2 flex items-center text-slate-500"
                    >
                      {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AuthButton text="Sign in" />

          <span className="text-slate-500 flex justify-center text-[1.1rem] sm:text-md md:text-md lg:text-lg  xl:text-xl">Don&apos;t have an account ?
            <Link href="/sign-up" className="ml-2">
              Sign up
            </Link>
          </span>

          <div className="flex items-center my-4">
            <div className="flex-grow border-b border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-b border-gray-300"></div>
          </div>
          <LoginGoogle />
          <LoginGithub />
        </form>
      </Form>
    </div>

  );
};

export default LoginForm;
