import { Outlet } from "react-router-dom";
import DashNav from "../components/DashNav";

function DashLayout() {
  return (
    <div className="flex flex-col h-screen">
      <DashNav/>

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default DashLayout;
