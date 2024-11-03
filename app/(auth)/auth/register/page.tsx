"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Eye, EyeOff } from "@geist-ui/icons";
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // RadioGroup bileşenlerini içeri aktarıyoruz

// E-posta ve şifre her iki rol için de zorunlu hale getirildi
const formSchema = z.object({
  fullname: z.string().min(3,"Fullname must be at least 6 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Register = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname:"",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () =>{
    setPasswordVisible((prev) =>!prev);
  }
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/auth/register", data,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      console.log("Registration successful:", response.data);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        console.log("Error:", error.response?.data || error.message);
      }
    }
  };
// 
  return (
   <div className="bg-slate-900 text-xl p-2   w-[25rem]  mb-[32rem] ">
   <h1 className="flex  justify-center mb-2 text-textColor ">Singup</h1>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        
      <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
            
              <FormControl>
                <Input  type="fullname" placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
            
              <FormControl>
                <Input  type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem  >
              <FormControl>
              <div className="relative">
                <Input type={passwordVisible ? "text" : "password"}  
                       placeholder="Password"
                      {...field} 
                  />
                  <button type="button" onClick={togglePasswordVisibility} 
                  className=" absolute inset-y-0  right-2 flex items-center text-slate-500">
                    {passwordVisible ? <EyeOff size={20}/> : <Eye size={20} />}
                  </button>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"mybutton"} className="w-full" type="submit">Signup</Button>
      </form>
    </Form>
   </div>
  );
};

export default Register;
