
"use client";

import { getTasks } from '@/actions/tasks/getAllTasks';
import React, { useEffect } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { deleteTask } from '@/actions/tasks/deleteTask';
import { format } from "date-fns";
import { Task } from '@/type/types';

import useGroupStore from '@/stores/useGroupStore';

const Complated = () => {
    const router = useRouter();
    const {
        selectedGroup,
        loadSelectedGroup,
    } = useGroupStore()

    useEffect(() => {
        loadSelectedGroup();
    }, [loadSelectedGroup]);



    const groupId = selectedGroup?.id || '';

    const { data: tasks, isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getTasks(groupId),
        enabled: !!groupId,
    });



    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (selectedGroup) {
                refetch();
            }
        }
    }, [selectedGroup, refetch]);





    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (isError) {
        return <div>Error loading tasks. Please try again later.</div>;
    }


    const handleDelete = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            toast({ variant: "success", title: "Task deleted successfully" });
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleDetailTask = (task: Task) => {
     
      router.push(`/admin/complated/${task.id}`)
    }

    const closedTasks = tasks?.filter((task) => task.status.toUpperCase() === 'CLOSED');

    
 
    return (
        <div className='w-full h-full '>        
            <div className='w-full h-full overflow-y-scroll '>
                    <Table className="">
                        <TableCaption className='text-xl bg-slate-800'>Task List</TableCaption>
                        <TableHeader className='bg-black text-white sticky top-0 text-2xl'>
                            <TableRow>
                                <TableHead>Group Name</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='text-xl w-full'>
                            {closedTasks?.map((task) => (
                                   <TableRow
                                   key={task.id}
                                   onClick={() => handleDetailTask(task)} 
                                   className={`
                                       hover:bg-gray-200  dark:hover:bg-darkBg2 
                                       cursor-pointer 
                                       h-16 
                                       ${new Date(task.dueDate) < new Date() ? 'text-slate-500' : ''}
                                   `}
                               >
                                    <TableCell>
                                        <div className="flex  justify-between">
                                        <span className=" text-green-500 ">
                                        <CiCircleCheck size={30}/>
                                        </span>
                                     {selectedGroup?.name}
                                     </div></TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>
                                        {task.description}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yyyy') : 'No deadline'
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            task.status
                                        }
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex space-x-4 cursor-pointer justify-center">

                                            <button className='hover:scale-125' onClick={() => handleDelete(task.id)}>
                                                <FaRegTrashAlt color='red' />
                                            </button>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </div>

        </div>
    )
}

export default Complated