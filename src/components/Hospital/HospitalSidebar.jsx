import { Link } from "react-router-dom";
import { Home, Info, FileText, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const sidebarScrollStyles = `
    .sidebar-scroll::-webkit-scrollbar {
        width: 8px;
    }
    .sidebar-scroll::-webkit-scrollbar-track {
        background: #fee2e2;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb {
        background: #ef4444;
        border-radius: 4px;
    }
    .sidebar-scroll::-webkit-scrollbar-thumb:hover {
        background: #dc2626;
    }
`;

export default function HospitalSidebar() {
    const initialCollapsed = sessionStorage.getItem("hospitalSidebarCollapsed") === "true";
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
        sessionStorage.setItem("hospitalSidebarCollapsed", String(!next));
        setIsOpen(next);
    };

    return (
        <>
            <style>{sidebarScrollStyles}</style>
            <div
                className={`sidebar-scroll bg-red-100 overflow-y-auto transition-all duration-300 h-screen ${
                    isOpen ? "w-[20%]" : "w-[80px]"
                }`}
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ef4444 #fee2e2",
                }}
            >
                <div className="">
                    <div className="p-5 bg-red-500 font-bold text-white text-2xl text-center flex items-center justify-between">
                        {isOpen && <h2>Navigation</h2>}
                        <button
                            onClick={toggle}
                            className="ml-auto p-1 hover:bg-red-600 rounded-lg transition"
                            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                    <div className={`${isOpen ? "m-8" : "m-4"} font-bold`}>
                        <ul className="">
                            <div className="mb-4">
                                <Link to="home">
                                    <li
                                        className="flex cursor-pointer items-center gap-3 bg-red-200 hover:bg-red-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center justify-center"
                                        title="Home"
                                    >
                                        <Home className="w-5 h-5 text-gray-700" />
                                        {isOpen && <span>Home</span>}
                                    </li>
                                </Link>
                            </div>
                            <div className="mb-4">
                                <Link to="info">
                                    <li
                                        className="flex cursor-pointer items-center gap-3 bg-red-200 hover:bg-red-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center justify-center"
                                        title="Your Information"
                                    >
                                        <Info className="w-5 h-5 text-gray-700" />
                                        {isOpen && <span>Your Info</span>}
                                    </li>
                                </Link>
                            </div>
                            <div className="mb-4">
                                <Link to="requests">
                                    <li
                                        className="flex cursor-pointer items-center gap-3 bg-red-200 hover:bg-red-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center justify-center"
                                        title="Blood Requests"
                                    >
                                        <FileText className="w-5 h-5 text-gray-700" />
                                        {isOpen && <span>Requests</span>}
                                    </li>
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
