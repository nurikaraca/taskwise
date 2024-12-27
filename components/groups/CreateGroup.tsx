

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
import { createGroup } from "@/actions/groups/createGroup";
import { toast } from "@/hooks/use-toast";
import useGroupStore from "@/stores/useGroupStore";

const formSchema = z.object({
  name: z.string().max(30, "Please enter a valid group name."),
  description: z.string().max(100, "Description is too long."),
});

const CreateGroup = () => {
  const {
    groups,
    selectedGroup,
    setSelectedGroup,
    setGroups,
    isLoading,
    error,
    loadSelectedGroup,
  } = useGroupStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const newGroup = await createGroup({
        name: data.name,
        description: data.description,
      });

      toast({
        variant: "success",
        title: "Group created successfully:",

      });
      
    form.reset();

    } catch (error) {
      console.error("An error occurred while creating the group: ", error);
      toast({
        variant: "destructive",
        title: "An error occurred while creating the group:",

      });
    }
  };



  return (
    <div className="w-[30rem] h-[20rem] bg-lightBg dark:bg-darkBg ">


      <div className="flex text-lightText dark:text-darkText flex-col items-center justify-start space-y-2 w-full h-full border-double border  gap-3 rounded-xl">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-center space-y-4 h-full w-full px-2  ">
            <h1 className='  flex justify-center   w-full  '>Create New Group</h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Group Name" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="text" placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

         
               <Button  variant="mybutton"  className=" flex  justify-center  w-full mb-5 " type="submit">Create New Group</Button>
          
             
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateGroup;
