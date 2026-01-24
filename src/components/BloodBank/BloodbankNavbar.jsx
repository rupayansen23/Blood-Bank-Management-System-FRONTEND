import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, LogOut } from "lucide-react";

export default function BloodbankNavbar({bloodBankInfo}) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        toast.success("Log out success");
        navigate("/login", { replace: true });
    };

    return(
        <div className="flex justify-between bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-md text-white top-">
            <div className="ml-5 p-5"><h1 className="font-bold text-2xl text-white">Blood Bank Dashbord</h1></div>
            <div className="flex items-center gap-2 mr-5 pr-5 relative">
                <h2 className="font-bold">Hii {bloodBankInfo.bloodBankName}</h2>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-red-600/30 rounded-full transition"
                    title="Profile menu"
                >
                    <User size={24} />
                </button>
                
                {isOpen && (
                    <div className="absolute top-16 right-0 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 w-48 z-50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition rounded-lg text-left font-medium"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}