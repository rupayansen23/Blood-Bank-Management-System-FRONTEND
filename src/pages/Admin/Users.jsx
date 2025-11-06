import UsersContent from "../../components/Admin/UsersContent"
import AdminNavbar from "../../components/Admin/AdminNavbar";
import Sidebar from "../../components/Admin/Sidebar";

export default function Users() {
    return (
        <div className="bg-white">
            <div><AdminNavbar></AdminNavbar></div>
                <div className="flex">
                    <Sidebar></Sidebar>
                    <UsersContent></UsersContent>
                </div>
        </div>
    )
}