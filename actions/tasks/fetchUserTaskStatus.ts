import axios from "axios";
const Urls = `http://localhost:3000/api/tasks/taskStatus`;

export const fetchUserTaskStatus = async (taskId: string) => {
    if (!taskId) {
        throw new Error("Task ID is required");
    }
    try {

        const response = await axios.get(Urls, {
            params: { taskId },
        });
        return response.data;
   
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};


















// <div className='w-full max-h-[33rem] overflow-y-scroll -mb-20'>
// {selectedTask ? (
//     <TaskDetail />
// ) : (
//     <Table className="">
//         <TableCaption className='text-xl bg-slate-800'>Task List</TableCaption>
//         <TableHeader className='bg-black text-white sticky top-0 text-2xl'>
//             <TableRow>
//                 <TableHead>Group Name</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>{isAdmin ? "Deadline" : "Status"}</TableHead>
//                 <TableHead>Actions</TableHead>
//             </TableRow>
//         </TableHeader>
//         <TableBody className='text-2xl'>
//             {tasks?.map((task) => (
//                 <TableRow key={task.id}>
//                     <TableCell>{selectedGroup?.name}</TableCell>
//                     <TableCell>{task.title}</TableCell>
//                     <TableCell>{task.description}</TableCell>
//                     <TableCell>
//                         {isAdmin
//                             ? task.dueDate
//                                 ? format(task.dueDate, "dd/MM/yyyy")
//                                 : "No deadline"
//                             : "rtyuj" }
//                     </TableCell>
//                     <TableCell>
//                         <div className="flex space-x-4 cursor-pointer">
//                             <button
//                                 className={`hover:scale-125 ${task.status === 'Closed' ? 'cursor-not-allowed opacity-50' : ''}`}
//                                 onClick={() => handleTaskDetail(task)}
//                                 disabled={task.status === 'Closed'}
//                             >
//                                 <FaPen color='green' />
//                             </button>
//                             {isAdmin && (
//                                 <button className='hover:scale-125' onClick={() => handleDelete(task.id)}>
//                                     <FaRegTrashAlt color='red' />
//                                 </button>
//                             )}
//                         </div>
//                     </TableCell>
//                 </TableRow>
//             ))}
//         </TableBody>
//     </Table>
// )}
// </div>
// );
// };

// export default ListTasks; burda   biraz sıkıntı var  sıkıntı şu ben deadline  ı  hem user hemde  admin için  gözükmesini istyorum   üser a ekstra olarak status ekleyip  { fetchUserTaskStatus(task.id) ? 'Complated' : 'Pedding'} bu tarz bişey kullanmak istyorum  acaba 



