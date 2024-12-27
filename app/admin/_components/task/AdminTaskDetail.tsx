"use client"
import { getTaskById } from "@/actions/tasks/getTaskById";
import { Member, Task } from "@/type/types";
import { redirect, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { format } from "date-fns";
import Members from "../Members";
import { getGroupMembers } from "@/actions/groups/getGroupMembers";
import { useQuery } from "@tanstack/react-query";
import useGroupStore from "@/stores/useGroupStore";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { MdDownloadForOffline } from "react-icons/md";
import { downloadFile } from "@/actions/files/downloadfile";
import { checkTaskFile } from "@/actions/files/checkTaskFile";
import { getMemberTaskStatus } from "@/actions/user/checkIsCompleted";

const AdminTaskDetail = () => {
  const router = useRouter();
  const params = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [memberStatuses, setMemberStatuses] = useState<{ [key: string]: boolean }>({});

  const {
    selectedGroup,
    loadSelectedGroup,
  } = useGroupStore();

  useEffect(() => {
    loadSelectedGroup();
  }, [loadSelectedGroup]);


  const { data: members, error, isLoading } = useQuery({
    queryKey: ['groupMembers', selectedGroup?.id],
    queryFn: () => getGroupMembers(selectedGroup?.id || ""),
    enabled: !!selectedGroup?.id,
  })

  const taskId = params.taskId as string;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(taskId);
        setTask(task)
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);


  const goToCompletedPage = () => {
    router.push('/admin/complated');
  }

  const downloadTaskFile = async (uploadedId: string) => {
    try {

      const response = await downloadFile(uploadedId, taskId);


      if (response && response.fileUrl) {
        const link = document.createElement("a");
        link.href = response.fileUrl;
        link.target = "_blank";
        link.download = "downloaded_file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Not found")
      }
    } catch (error) {
       console.error("Error:", error);
      
    }
  };



  useEffect(() => {
    const fetchMemberStatuses = async () => {
      if (members && taskId) {
        const statuses: { [key: string]: boolean } = {};
        for (const member of members) {
          try {
            const status = await getMemberTaskStatus(member.id, taskId);
            statuses[member.id] = status.isCompleted;
          } catch (error) {
            console.error(`Error fetching status for member ${member.id}:`, error);
          }
        }
        setMemberStatuses(statuses);
      }
    };

    fetchMemberStatuses();
  }, [members, taskId]);
  return (
    <div className='h-full w-full '>
      <div className="h-[5rem] w-20  rounded-full " onClick={() => goToCompletedPage()} >
        <IoArrowBackSharp size={80} />
      </div>

      <div className="flex h-[calc(100vh-14rem)] w-full">

        <div className="h-full w-full ml-4">
          <div className="h-full max-w-[30rem] flex items-start justify-center p-4 bg-white shadow-lg rounded-lg border border-gray-200  flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 flex justify-center w-full uppercase ">
              <span className="text-blue-600">{task?.title}</span>
            </h2>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">    {task?.description || "No description available"}</span>

            </p>
            <p className="text-green-600 flex w-full  justify-center">
              <span className="font-medium text-gray-800">Deadline: </span>
              {task?.dueDate ? format(new Date(task.dueDate), "dd/MM/yyyy") : "No deadline"}
            </p>
          </div>

        </div>

        <div className=" h-full w-full scroll-custom p-10 mr-4">
          <div className="w-full mt-4  p-4 hover:border-b-2 border-slate-200/10  h-[37rem]   scroll-custom text-slate-900">


            <ul className="pl-4 w-full">
              {members?.map((member: Member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-start p-3 drop-shadow-2xl rounded-md cursor-pointer shadow-md hover:scale-105 transition-all duration-200 ease-in-out"
                >
                  {/* Avatar */}
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="rounded-full mr-3"
                    />
                  ) : (
                    <RxAvatar size={30} className="rounded-full mr-3" />
                  )}

                  {/* Member Name */}
                  <div className="flex justify-between w-full">
                    <span className="font-medium">{member.name}</span>
                    {/* Download Button */}
                    <button
                      onClick={() => downloadTaskFile(member.id)}
                      className={`${memberStatuses[member.id]
                          ? "text-blue-600 hover:text-blue-800"
                          : "text-gray-400 cursor-not-allowed"
                        }`}
                      disabled={!memberStatuses[member.id]}
                    >
                      <MdDownloadForOffline size={30} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>


          </div>
        </div>
      </div>



    </div>
  )
}

export default AdminTaskDetail