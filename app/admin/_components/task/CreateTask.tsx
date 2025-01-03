"use client";
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


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
import {  useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Member } from "@/type/types";
import useGroupStore from "@/stores/useGroupStore";

const formSchema = z.object({
  title: z.string().min(2).max(100, "Title is too long."),
  description: z.string().max(250, "Description is too long."),
  date: z.date().nullable().refine(
    (date) => {
      if (!date) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      return date >= today;
    },
    { message: "Date must be today or later." }
  ),
});

const CreateTask = () => {
  const { selectedGroup } = useGroupStore(); 
  const [members] = useState<Member[]>([]);
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date());


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
    },
  });

  const onSubmit = async (data: { title: string; description: string, date: Date }) => {
    if (!selectedGroup?.id) {
      console.error("No group is selected.");
      return;
    }
    //If there are no members in the group, a task cannot be created.
    if (members.length === 1) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "If there are no members in the group, a task cannot be created."
      })
      form.reset();
      return;
    }

    try {
      await createTask({
        title: data.title,
        description: data.description,
        groupId: selectedGroup.id,
        dueDate: data.date,
      });

     
      toast({
        variant: "success",
        title: "Task created",
      })
      // Reset form
      form.reset();
    } catch (error) {
      toast(
        {
          variant: "destructive",
          title: "Something went wrong.",
          description: "An error occurred while creating the task:"
        })
      console.error("An error occurred while creating the task:", error);
    }
  };


  return (
    <div className="flex items-center justify-center  flex-col  w-full  h-full  ">
      <h2 className=" text-xl font-bold">Create New Task</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-full md:w-[30rem] mt-9  ">
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
                      />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Calendar Input */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal  ",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 text-white">
                      <Calendar
                     
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          field.onChange(selectedDate); 
                        }}
                        initialFocus
                        className="rounded-md border shadow "
                      />
                    </PopoverContent>
                  </Popover>
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
