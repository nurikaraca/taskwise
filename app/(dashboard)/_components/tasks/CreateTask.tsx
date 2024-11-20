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

const formSchema = z.object({
  title: z.string().max(100, "Title is too long."),
  description: z
    .string().max(250, "Description is too long."),
});

const CreateTask = () => {
  const { selectedGroup } = useGroup();
  

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

    try {

      const newTask = await createTask({
        title: data.title,
        description: data.description,
        groupId: selectedGroup.id, 
      });

      console.log("Task successfully created:", newTask);

      // Reset form
      form.reset();
    } catch (error) {
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
          <Button className="bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center" type="submit">
            Create Task
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTask;
