"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "@geist-ui/icons";
import Link from "next/link";
import { signupWithCreds } from "@/actions/auth"; 
import AuthButton from "./AuthButton";
import LoginGoogle from "./LoginGoogle";
import LoginGithub from "./LoginGithub";


const formSchema = z.object({
  email: z.string().email("Geçerli bir e-posta giriniz."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı."),
  passwordConfirm: z.string().min(6, "Şifre en az 6 karakter olmalı."),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Şifreler eşleşmiyor.",
  path: ["passwordConfirm"],
});

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  
  const onSubmit = async (data: any) => {
    const result = await signupWithCreds(data);
    if (result?.error) {
      console.error("Register failed:", result.error);;
    } else {
      router.push("/"); 
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex bg-white text-slate-900 flex-col items-center text-xl p-5 w-[27rem] border space-y-2">
      <h1 className="mb-2 text-slate-700">Sign up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
                      placeholder="Create password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-2 flex items-center text-slate-500"
                    >
                      {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-2 flex items-center text-slate-500"
                    >
                      {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <AuthButton text="Sign up" />

          <span className="text-slate-700 flex justify-center">
          Already have an account?
            <Link href="/sign-in" className="ml-2">
            Sign in
            </Link>
          </span>

          <div className="flex items-center my-4">
            <div className="flex-grow border-b border-gray-300"></div>
            <span className="mx-4 text-gray-500">YA DA</span>
            <div className="flex-grow border-b border-gray-300"></div>
          </div>

          <LoginGoogle />
          <LoginGithub />
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
