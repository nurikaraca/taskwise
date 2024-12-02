

"use client";

import { getTasks } from '@/actions/tasks/getAllTasks';
import { useGroup } from '@/app/context/GroupContext';
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
import { Task, useTask } from '@/app/context/TaskContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import TaskDetail from './TaskDetail';
import { checkTaskFile } from '@/actions/files/checkTaskFile';
import { toast } from '@/hooks/use-toast';
import { deleteTask } from '@/actions/tasks/deleteTask';

const ListTasks = () => {
    const { selectedGroup } = useGroup();
    const { selectedTask, setSelectedTask } = useTask();
    const [tasksWithStatus, setTasksWithStatus] = useState<Task[]>([]); 

    const router = useRouter();

    const handleTaskDetail = async (task: Task) => {
        try {
            const taskId = task.id;
            const existingFile = await checkTaskFile({ taskId });
            if (existingFile) {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "A file has already been submitted for this task!",
                });
                return;
            }
        } catch (error: any) {
            if (error.message === "No file found.") {
                setSelectedTask(task);
            } else {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                });
            }
        }
    };

    const groupId = selectedGroup?.id || '';
    const { data: tasks, isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getTasks(groupId),
    });

    useEffect(() => {
        if (typeof window !== 'undefined'){
            refetch(); 
        }
    }, [selectedGroup]);

    useEffect(() => {
        if (typeof window !== 'undefined'){
             const updateTaskStatuses = async () => {
            if (!tasks) return;

            const updatedTasks = await Promise.all(
                tasks.map(async (task) => {
                    try {
                        const hasFile = await checkTaskFile({ taskId: task.id });
                        return {
                            ...task,
                            status: hasFile ? 'Completed' : task.status || 'Pending',
                        };
                    } catch {
                        return {
                            ...task,
                            status: task.status || 'Pending',
                        };
                    }
                })
            );

            setTasksWithStatus(updatedTasks);
        };

        updateTaskStatuses();
        }

       
    }, [tasks]);

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

    return (
        <div className='w-full h-full'>
            {selectedTask ? (
                <TaskDetail />
            ) : (
                <Table className='text-2xl'>
                    <TableCaption className='text-xl bg-slate-800'>Task List</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Group Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasksWithStatus.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{selectedGroup?.name}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-4 cursor-pointer">
                                        <button
                                            className='hover:scale-125'
                                            onClick={() => handleTaskDetail(task)}
                                        >
                                            <FaPen color='green' />
                                        </button>
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

export default ListTasks;
