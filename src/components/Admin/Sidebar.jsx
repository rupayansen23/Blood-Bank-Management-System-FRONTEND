import { Building2, Droplet, Users, Home, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const sidebarScrollStyles = `
    .sidebar-scroll::-webkit-scrollbar {
        width: 8px;
    }
    .sidebar-scroll::-webkit-scrollbar-track {
        background: #fce7f3;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb {
        background: #ec4899;
        border-radius: 4px;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb:hover {
        background: #db2777;
    }
`;

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <>
            <style>{sidebarScrollStyles}</style>
            <div className={`sidebar-scroll bg-pink-100 overflow-y-auto transition-all duration-300 h-screen ${isOpen ? 'w-[20%]' : 'w-[80px]'}`} style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#ec4899 #fce7f3'
            }}>
            <div className="">
                <div className="p-5 bg-pink-400 font-bold text-black text-2xl text-center flex items-center justify-between">
                    {isOpen && <h2>Navigation</h2>}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="ml-auto p-1 hover:bg-pink-500 rounded-lg transition"
                        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div className={`${isOpen ? 'm-8' : 'm-4'} font-bold`}>
                    <ul className="">
                        <div className="mb-4">
                            <Link to="hospitals">
                            <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Hospitals">
                                <Building2 className="w-5 h-5 text-gray-700" /> {isOpen && <span>Hospitals</span>}
                            </li>
                        </Link>
                        </div>
                         <div className="mb-4">
                            <Link to="bloodBank">
                            <li className="flex items-center justify-center gap-3 cursor-pointer bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Blood Banks">
                                <Droplet className="w-5 h-5 text-gray-700" /> {isOpen && <span>Blood Banks</span>}
                            </li>
                         </Link>
                         </div>
                        <div className="mb-4">
                            <Link to="users">
                            <li className="flex items-center justify-center gap-3 cursor-pointer bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Users">
                                <Users className="w-5 h-5 text-gray-700" /> {isOpen && <span>Users</span>}
                            </li>
                        </Link>
                        </div>
                        <div className="mb-4">
                            <Link to="home">
                        <li className="flex items-center justify-center gap-3 cursor-pointer bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Home">
                            <Home className="w-5 h-5 text-gray-700" /> {isOpen && <span>Home</span>}
                        </li>
                        </Link>
                        </div>
                    </ul>
                </div>
            </div>
            </div>
        </>
    )
}