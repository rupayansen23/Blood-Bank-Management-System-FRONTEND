import { useEffect, useState } from "react"
import { getAdmin } from "../../Store/AdminSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminNavbar() {

    const navigate = useNavigate();
    const adminData = useSelector(getAdmin);
    // const [adminInfo, setAdminInfo] = useState(null);

    // useEffect(()=>{
    //     async function fetchData(params) {
            
    //         const response = await fetch(`http://localhost:8081/getAdminInfo/${adminData.userName}`);
    //         const data = await response.json();
    //         console.log(data);
    //         setAdminInfo(data);

    //     }
    //     fetchData();
    // }, [adminInfo])

    const handleLogout = () => {
        sessionStorage.clear();
        toast.success("Log out success");
        navigate("/login");
    }

    return (
        <div className="flex justify-between bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-md text-white top-">
            <div className="ml-5 p-5"><h1 className="font-bold text-2xl ">Admin Panel</h1></div>
            <div className="flex items-center">
                <h2 className="mr-4 p-5">Hii {adminData?.firstName}</h2>
                <button 
                    onClick={handleLogout}
                    className="mr-5 px-4 py-2 bg-white text-red-700 font-semibold rounded hover:bg-red-100 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}