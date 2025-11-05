import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";


export default function AdminDasbord() {

    return(
      <div className="bg-white">
        <div><AdminNavbar></AdminNavbar></div>
        <div className="flex">
          <Sidebar></Sidebar>
          <MainContent></MainContent>
        </div>
      </div>
    )
}