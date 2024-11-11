import Groups from "./_components/groups/Groups";

interface DashboardLayoutProps {
    children: React.ReactNode
  }
 
 const DashboardLayout = ({ children }: DashboardLayoutProps) => {

    return (
     

      
       <div className=" w-full flex h-full"> 
           <div className="grow-[1] h-full "> 
              <Groups />
          </div>
           <div className="w-[1px] h-full border-b border-[#2B2B2B] "></div> 
          <main className="grow-[9]  p-4 bg-[#1F1F1F]">
             {children}
          </main>
        </div>
        
    );
}
export default DashboardLayout;