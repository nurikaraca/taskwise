"use client"

import { getTasks } from '@/actions/tasks/getAllTasks';
import { useGroup } from '@/app/context/GroupContext';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Task } from '@/app/context/TaskContext';
import { useQuery } from '@tanstack/react-query';

const ListTasks = () => {
    const { selectedGroup } = useGroup();
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
        <div className='w-full h-full '>
            <Table className='text-2xl'>
                <TableCaption className='text-xl bg-slate-800'>Task List</TableCaption>
                <TableHeader >
                    <TableRow >
                        <TableHead>Group Name</TableHead>
                        <TableHead className="">Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        tasks?.map((task)=>(
                            <TableRow key={task.id}>
                        <TableCell className="">{selectedGroup?.name}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell className="">{task.status || 'Pending'}</TableCell>
                    </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default ListTasks