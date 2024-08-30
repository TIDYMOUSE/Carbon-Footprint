import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
