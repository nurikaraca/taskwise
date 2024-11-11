
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
import { Button } from "@/components/ui/button";
import { createGroup } from "@/actions/groups/createGroup";


const formSchema = z.object({
  name: z.string().max(30,"Please enter a valid email."),
  
});

const CreateGroup = () => {
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  

  const onSubmit = async (data: any) => {
    await createGroup({
      name:data.name,
      description:data.description,
      });
  };
  return (
    <div className=" flex text-white font-semibold  flex-col items-center justify-center m-2    space-y-2 w-[15rem] ">
      <h1 className=" ">Create New Group</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 ">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Group Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button>
          Create New Group
          </Button>
          
        </form>
      </Form>
    </div>

  );
};

export default CreateGroup;
