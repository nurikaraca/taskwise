"use client"
import { Button } from '@/components/ui/button';
import AdminListTask from './AdminListTask'
import { MdDashboard } from "react-icons/md";
const AdminTasks = () => {
  return (
    <div className='w-full h-full'>

<div className="w-full h-[5rem] ">


</div>
       <div className='w-full h-[calc(100vh-10rem)] '>
         <AdminListTask /> 
    </div>
    </div>
  )
}

export default AdminTasks