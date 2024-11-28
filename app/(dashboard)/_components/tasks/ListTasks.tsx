"use client"

import { getTasks } from '@/actions/tasks/getAllTasks';
import { useGroup } from '@/app/context/GroupContext';
import React, { useEffect, useState } from 'react'
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Task, useTask } from '@/app/context/TaskContext';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import TaskDetail from './TaskDetail';

const ListTasks = () => {
    const { selectedGroup } = useGroup();
   const {selectedTask,setSelectedTask } = useTask();
  
    const router = useRouter();

  const handleTaskDetail = (task: Task) =>{
    setSelectedTask(task)
  }
    const groupId = selectedGroup?.id || ''; 
    const { data:tasks, isLoading, isError, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn:() => getTasks(groupId),       
  }); 

    //When the selected group changes, refetch is triggered.
  useEffect(() => {
        refetch();
        
  }, [selectedGroup]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
}

if (isError) {
    return <div>Error loading tasks. Please try again later.</div>;
}


return (
    <div className='w-full h-full'>
        
        {selectedTask ? (
            <TaskDetail  />
        ) : (
            <Table className='text-2xl'>
                <TableCaption className='text-xl bg-slate-800'>Task List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Group Name</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks?.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{selectedGroup?.name}</TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.status || 'Pending'}</TableCell>
                            <TableCell>
                                <div className="flex space-x-4 cursor-pointer">
                                    <button
                                        className='hover:scale-125'
                                        onClick={() => handleTaskDetail(task)}
                                    >
                                        <FaPen color='green' />
                                    </button>
                                    <button className='hover:scale-125'>
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
}

export default ListTasks;