
"use client";

import { getTasks } from '@/actions/tasks/getAllTasks';
import React, { useEffect, useState } from 'react';
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useTask } from '@/context/TaskContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { checkTaskFile } from '@/actions/files/checkTaskFile';
import { toast } from '@/hooks/use-toast';
import { deleteTask } from '@/actions/tasks/deleteTask';
import { useAdmin } from '@/context/AdminContext';
import { format } from "date-fns";
import { Task } from '@/type/types';

import useGroupStore from '@/stores/useGroupStore';
import AdminTaskDetail from './AdminTaskDetail';

const AdminListTask = () => {
    const router = useRouter();
    const { selectedTask, setSelectedTask, setView } = useTask();
    const {
        groups,
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
    }, [selectedGroup]);





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

const  pendingTasks  = tasks?.filter((task) =>task.status === 'PENDING')



    return (


        <div className='w-full h-full overflow-y-scroll '>
            {selectedTask ? (
                <AdminTaskDetail />
            ) : (
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
                        {pendingTasks?.map((task) => (
                            <TableRow key={task.id}
                                className={`hover:backdrop-blur-xl h-16 ${new Date(task.dueDate) < new Date() ? 'text-slate-500' : ''}`}
                            >
                                <TableCell>{selectedGroup?.name}</TableCell>
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
            )}
        </div>
    );
};

export default AdminListTask;



