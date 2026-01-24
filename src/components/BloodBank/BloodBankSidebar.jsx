import { Link } from "react-router-dom"
import { CircleUserRound, HeartPulse, Droplets, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

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

export default function BloodBankSidebar() {
    const initialCollapsed = sessionStorage.getItem("sidebarCollapsed") === "true";
    const [isOpen, setIsOpen] = useState(!initialCollapsed);

    useEffect(() => {
        const handler = (e) => {
            const collapsed = e?.detail?.collapsed === true;
            setIsOpen(!collapsed);
        };
        window.addEventListener("sidebar-toggle", handler);
        return () => window.removeEventListener("sidebar-toggle", handler);
    }, []);

    const toggle = () => {
        const next = !isOpen;
        sessionStorage.setItem("sidebarCollapsed", String(!next));
        setIsOpen(next);
    };

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
                        onClick={toggle}
                        className="ml-auto p-1 hover:bg-pink-500 rounded-lg transition"
                        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div className={`${isOpen ? 'm-8' : 'm-4'} font-bold`}>
                    <ul className="">
                        <div className="mb-4">
                            <Link to="bloodbankinfo">
                                <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Your Information">
                                    <CircleUserRound className="w-5 h-5 text-gray-700" /> {isOpen && <span>Your Information</span>}
                                </li>
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Link to="bloodrequest">
                                <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Requests">
                                    <HeartPulse className="w-5 h-5 text-gray-700" /> {isOpen && <span>Requests</span>}
                                </li>
                            </Link>                        
                        </div>
                        <div className="mb-4">
                            <Link to="donaterequest">
                                <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center" title="Donate Requests">
                                    <Droplets className="w-5 h-5 text-gray-700" /> {isOpen && <span>Donate Requests</span>}
                                </li>
                            </Link>
                        </div>
                        <div className="mb-4"></div>
                    </ul>
                </div>
            </div>
            </div>
        </>
    )
}