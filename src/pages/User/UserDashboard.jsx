import UserNavbar from "../../components/User/UserNavbar"
import Sidebar from "../../components/User/Sidebar"
import { Outlet } from "react-router"

export default function UserDashboard() {
    return (
        <div className="bg-white">
            <div><UserNavbar></UserNavbar></div>
            <div className="flex">
                <Sidebar></Sidebar>
                <div className="flex-1 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}