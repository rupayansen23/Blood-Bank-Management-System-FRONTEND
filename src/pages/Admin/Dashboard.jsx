import AdminNavbar from "../../components/Admin/AdminNavbar";
import Sidebar from "../../components/Admin/Sidebar";
import AdminHome from "../../components/Admin/AdminHome";


export default function AdminDasbordHome() {

    return(
      <div className="bg-white">
        <div><AdminNavbar></AdminNavbar></div>
        <div className="flex">
          <Sidebar></Sidebar>
          <AdminHome></AdminHome>
        </div>
      </div>
    )
}