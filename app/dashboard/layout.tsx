
import Sidebar from "@/components/SideBar/sidebar";


interface DashboardLayoutProps {
   children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

   return (
      <div className=" w-full flex h-full ">
         <div className="h-full w-[270px]">
                <Sidebar />
         </div>
     
         <main className="w-[calc(100vw-270px)]  h-full ">
            {children}
         </main>
      </div>

   );
}
export default DashboardLayout;