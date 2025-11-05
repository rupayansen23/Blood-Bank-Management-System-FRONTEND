import { useEffect } from "react"
import { getAdmin } from "../Store/AdminSlice";
import { useSelector } from "react-redux";

export default function AdminNavbar() {

    const adminData = useSelector(getAdmin);
    console.log(adminData);

    // useEffect(()=>{
    //     async function fetchData(params) {
            
    //         const response = await fetch("http://localhost:5173/getAdminInfo/{userName}");

    //     }
    //     fetchData();
    // })

    return (
        <div className="flex justify-between bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-md text-white">
            <div className="ml-5 p-5"><h1 className="font-bold text-2xl text-white">Admin Panel</h1></div>
            <div>
                <h2 className="mr-4 p-5">Hii {adminData?.firstName}</h2>
            </div>
        </div>
    )
}