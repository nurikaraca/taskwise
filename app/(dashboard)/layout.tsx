
interface DashboardLayoutProps {
    children: React.ReactNode
  }
 
 const DashboardLayout = ({ children }: DashboardLayoutProps) => {

    return (
     

      
       <div className="h-full w-full bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] flex "> 
           <div className="grow-[2]  p-4 bg-blur-3xl "> 
               
          </div>
           <div className="w-[1px] h-full  bg-white mx-auto "></div> 
          <main className="grow-[8]  p-4 ">
             {children}
          </main>
        </div>
        
    );
}
export default DashboardLayout;