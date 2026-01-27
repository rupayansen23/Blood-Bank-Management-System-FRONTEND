import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HospitalNavbar({ hospitalInfo }) {
    const navigate = useNavigate();

    const getInitials = (name) => {
        if (!name) return "H";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(hospitalInfo?.hospitalName);

    const handleLogout = () => {
        sessionStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-md text-white">
            <div className="ml-5 p-5">
                <h1 className="font-bold text-2xl text-white">Hospital Dashboard</h1>
            </div>
            <div className="flex items-center gap-4 mr-5 pr-5">
                <div className="flex flex-col items-end">
                    <h2 className="font-bold">Hi {hospitalInfo.hospitalName}</h2>
                    {hospitalInfo?.hospitalAddress && (
                        <p className="text-sm opacity-90">Location: {hospitalInfo.hospitalAddress}</p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-red-700 text-lg">
                    {initials}
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white text-red-700 font-semibold rounded hover:bg-red-100 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
