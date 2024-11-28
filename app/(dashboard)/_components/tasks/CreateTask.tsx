"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTask } from "@/actions/tasks/createTask";
import { useGroup } from "@/app/context/GroupContext";
import { useEffect, useState } from "react";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import { Member } from "../groups/GroupDetail";
import { useToast } from "@/hooks/use-toast";
import { useTask } from "@/app/context/TaskContext";

const formSchema = z.object({
  title: z.string().max(100, "Title is too long."),
  description: z
    .string().max(250, "Description is too long."),
});

const CreateTask = () => {
  const { selectedGroup } = useGroup();
  const [members, setMembers] = useState<Member[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchMembers = async () => {
        if (selectedGroup?.id) {
          try {
            const data = await getGroupMembers(selectedGroup.id);
            setMembers(data);
          } catch (error) {
            console.error("Error fetching members:", error);
          }
        }
      };
      fetchMembers();
    }
  }, [selectedGroup]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: { title: string; description: string }) => {
    if (!selectedGroup?.id) {
      console.error("No group is selected.");
      return;
    }
    //If there are no members in the group, a task cannot be created.
    if (members.length === 1) {
      toast({ 
        variant: "destructive", 
        title: "Something went wrong.", 
        description: "If there are no members in the group, a task cannot be created." })
      form.reset();
      return;
    }

    try {
      const newTask = await createTask({
        title: data.title,
        description: data.description,
        groupId: selectedGroup.id,
      });

      console.log("", newTask);
       toast({
        variant:"success",
        title: "Task created", 
       })
      // Reset form
      form.reset();
    } catch (error) {
      toast(
        { 
        variant: "destructive", 
        title: "Something went wrong.", 
        description: "An error occurred while creating the task:" })
      console.error("An error occurred while creating the task:", error);
    }
  };


  return (
    <div className="flex text-white flex-col items-center justify-center space-y-4 w-full h-full">
      <h2 className="text-white text-xl font-bold">Create New Task</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-[50rem] ">
          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Task Title"
                    {...field}
                    className="text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Input */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Task Description"
                    {...field}
                    className="text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button className="bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center text-xl  rounded-xl " type="submit">
            Create Task
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTask;
