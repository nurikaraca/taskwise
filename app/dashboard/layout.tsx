
import Sidebar from "@/components/SideBar/sidebar";


interface DashboardLayoutProps {
   children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

   return (
      <div className=" w-full flex h-full ">
          <div className="h-full  sm:w-[270px]">
         <Sidebar  />
         </div>
     
         <main
            className=" w-full  sm:w-[calc(100vw-270px)]
             h-full bg-lightBg2 dark:bg-darkBg"
               
         >
            {children}
         </main>
      </div>

   );
}
export default DashboardLayout;