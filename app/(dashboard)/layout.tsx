import Groups from "./_components/groups/Groups";

interface DashboardLayoutProps {
    children: React.ReactNode
  }
 
 const DashboardLayout = ({ children }: DashboardLayoutProps) => {

    return (
     

      
       <div className=" w-full flex   h-[40rem] "> 
           <div className=" h-[21rem]   w-[40rem]"> 
              <Groups />
          </div>
           <div className="w-[100px]  border-b border-[#2B2B2B] "></div> 
          <main className="w-full ">
             {children}
          </main>
        </div>
        
    );
}
export default DashboardLayout;