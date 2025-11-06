import { Building2, Droplet, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
export default function Sidebar() {
    return(
        <div className="w-[20%] h-screen bg-pink-100">
            <div className="">
                <div className="p-5 bg-pink-400 font-bold text-black text-2xl text-center">
                    <h2>Nevigation</h2>
                </div>
                <div className="m-8 font-bold">
                    <ul className="space-y-4">
                        <Link to="hospitals">
                            <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                <Building2 className="w-5 h-5 text-gray-700" /> <span>Hospitals</span>
                            </li>
                        </Link>
                         <Link to="bloodBank">
                            <li className="flex items-center justify-center gap-3 cursor-pointer bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                <Droplet className="w-5 h-5 text-gray-700" /> <span>Blood Banks</span>
                            </li>
                         </Link>
                        <Link to="users">
                            <li className="flex items-center justify-center gap-3 cursor-pointer bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                <Users className="w-5 h-5 text-gray-700" /> <span>Users</span>
                            </li>
                        </Link>
                        <Link to="home">
                        <li className="flex items-center justify-center gap-3 cursor-pointer bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                            <Home className="w-5 h-5 text-gray-700" /> <span>Home</span>
                        </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}