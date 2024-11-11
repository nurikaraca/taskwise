
"use server"

import { signIn, signOut } from '@/auth';
import { db } from "@/db";
import { AuthError } from "next-auth";
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const login = async (provider: string) => {
    await signIn(provider, { redirectTo: "/" });
    revalidatePath("/dashboard");
};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
    revalidatePath("/");
};




export const signupWithCreds = async (formData: { email: string; password: string }) => {
    const { email, password } = formData;

   
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "User already exists. Please login." };
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
       
        const newUser = await db.user.create({
            data: {
                email,
                hashedPassword,
            },
        });

        
        revalidatePath("/");
        return { success: "User registered and logged in." };
    } catch (error) {
        console.log("Signup error:", error);
        return { error: "Signup failed. Please try again." };
    }
};


export const loginWithCreds = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return { error: "User not found!" };
    }
  
    const hashedPassword = existingUser.hashedPassword;
    if (!hashedPassword) {
      return { error: "Invalid credentials!" };
    }
  
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  
    if (!isPasswordCorrect) {
      return { error: "Invalid credentials!" };
    }
  
    const result = await signIn("credentials", { redirect: false, email, password });
  
    if (result?.error) {
      return { error: result.error };
    }
  
    return { success: true };
  };
  
