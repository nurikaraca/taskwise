import Groups from "./_components/groups/Groups";

interface DashboardLayoutProps {
    children: React.ReactNode
  }
 
 const DashboardLayout = ({ children }: DashboardLayoutProps) => {

    return (
     

      
       <div className=" w-full flex h-full "> 
           <div className=" h-full w-[8rem] sm:w-[11rem]  md:w-[14rem] lg:w-[18rem] xl:w-[25rem]"> 
              <Groups />
          </div>
           <div className="w-[1px] h-full border-b border-[#2B2B2B] "></div> 
          <main className="w-full   bg-[#1F1F1F]">
             {children}
          </main>
        </div>
        
    );
}
export default DashboardLayout;