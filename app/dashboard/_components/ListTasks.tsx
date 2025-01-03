
"use client";

import React, { useEffect } from 'react';
import { FaPen } from "react-icons/fa";
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
import { format } from "date-fns";
import { Task, UserTaskStatus } from '@/type/types';
import useGroupStore from '@/stores/useGroupStore';
import { getPeddingTasks } from '@/actions/tasks/getPeddingTasks';
import TaskDetail from './TaskDetail';
import { useTask } from '@/context/TaskContext';

const ListTasks = () => {
    const { selectedTask, setSelectedTask } = useTask();
    const { selectedGroup, loadSelectedGroup, } = useGroupStore();

    useEffect(() => {
        loadSelectedGroup();
    }, [loadSelectedGroup]);


    const { data: pendingTasks, isLoading, isError } = useQuery<UserTaskStatus[]>({
        queryKey: ['pendingTasks'],
        queryFn: getPeddingTasks,
    });

    if (!pendingTasks) {
        return <div>No Task</div>;
    }
    const tasks: Task[] = [...pendingTasks.map((item) => item.task)];

    console.log(tasks);


    const handleTaskDetail = (task: Task) => {
        try {
            const taskId = task.id;
            if (!taskId) {
                console.warn("Task ID is missing!");
                return;
            }


            setSelectedTask(task);

            console.log(`Task selected: ${task.title}`);
        } catch (error) {
            console.error("Error selecting task:", error);
        }
    };



    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (isError) {
        return <div>Error loading tasks. Please try again later.</div>;
    }

    return (


        <div className='w-full h-[calc(100%-5rem)] overflow-y-scroll -mb-20'>
            {selectedTask ? (
                <TaskDetail />
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
                        {tasks?.map((task) => (
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
                                        <button
                                            className={`hover:scale-125 ${task.status === 'Closed' ? 'cursor-not-allowed opacity-50' : ''}`}
                                            onClick={() => handleTaskDetail(task)}
                                            disabled={task.status === 'Closed'}
                                        >
                                            <FaPen color='green' />
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



