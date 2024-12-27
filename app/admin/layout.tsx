
import Sidebar from "@/components/SideBar/sidebar";
import Groups from "../../components/groups/Groups";

interface AdminLayoutProps {
   children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {

   return (
      <div className=" w-full flex h-full  ">
         <div className="h-full w-[270px]">
                <Sidebar />
         </div>
     
         <main className="w-[calc(100vw-270px)]  h-full bg-lightBg2 dark:bg-darkBg">
            {children}
         </main>
      </div>

   );
}
export default AdminLayout;