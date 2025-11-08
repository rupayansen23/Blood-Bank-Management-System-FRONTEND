import AdminNavbar from "../../components/Admin/AdminNavbar";
import Sidebar from "../../components/Admin/Sidebar";
import { Outlet } from "react-router-dom";


export default function AdminDasbordHome() {

    return(
      <div className="bg-white">
        <div><AdminNavbar></AdminNavbar></div>
        <div className="flex">
          <Sidebar></Sidebar>
          <div className="flex-1 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    )
}