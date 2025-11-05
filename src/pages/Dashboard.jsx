import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { useSelector } from "react-redux";
import { getAdmin } from "../Store/AdminSlice";

export default function AdminDasbord() {


    return(
      <div>
        <div><AdminNavbar></AdminNavbar></div>
        <div>
          <div><Sidebar></Sidebar></div>
          <div><MainContent></MainContent></div>
        </div>
      </div>
    )
}