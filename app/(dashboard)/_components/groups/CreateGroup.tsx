

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
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
import { useGroup } from "@/app/context/GroupContext";

const formSchema = z.object({
  name: z.string().max(30, "Please enter a valid group name."),
  description: z.string().max(100, "Description is too long."),
});

const CreateGroup = () => {
  const { isCreateGroupFormVisible, setIsCreateGroupFormVisible,inviteLink,setInviteLink } = useGroup();
  
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
  
      
      setIsCreateGroupFormVisible(false);
    } catch (error) {
      console.error("An error occurred while creating the group:", error);
    }
  };

  return (
    <div className="flex text-white flex-col items-center justify-center space-y-2 w-full h-full">
      <h2>Create New Group</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit">Create New Group</Button>
        </form>
      </Form>

      
      {inviteLink && (
        <div className="mt-4 p-2 bg-gray-800 text-center rounded">
          <p>Group Invite Link:</p>
          <p className="text-blue-300">{inviteLink}</p>
        </div>
      )}
    </div>
  );
};

export default CreateGroup;















// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "@geist-ui/icons";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { createGroup } from "@/actions/groups/createGroup";
// import { useGroup } from "@/app/context/GroupContext";


// const formSchema = z.object({
//   name: z.string().max(30,"Please enter a valid email."),
  
// });

// const CreateGroup = () => {
//   const { isCreateGroupFormVisible, setIsCreateGroupFormVisible } = useGroup();

  
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//     },
    
//   });

  

//   const onSubmit = async (data: any) => {
//     try {
//       await createGroup({
//         name: data.name,
//         description: data.description,
//       });

//       setIsCreateGroupFormVisible(false);  
//     } catch (error) {
//       console.error("An error occurred while creating the group: ", error);
//     }
//   };
//   return (
//     <div className=" flex text-white flex-col   items-center justify-center   space-y-2 w-full  h-full ">
//    <h2>Create New Group</h2>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-4 ">

//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input type="text" placeholder="Group Name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input type="text" placeholder="Description" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
          
//           <Button>
//           Create New Group
//           </Button>
          
//         </form>
//       </Form>
//     </div>

//   );
// };

// export default CreateGroup;
