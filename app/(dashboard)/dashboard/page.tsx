
import Task from "../_components/tasks/Task";

const DashBoard = () => {
  return (
    <div className="relative  text-white flex">
    
      <div className="relative z-10 flex flex-1 h-full ">
        <Task />
      </div>
    </div>
  );
};

export default DashBoard;

