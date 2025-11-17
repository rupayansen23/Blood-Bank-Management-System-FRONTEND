import UserNavbar from "../../components/User/UserNavbar"
import Sidebar from "../../components/User/Sidebar"
import { Outlet } from "react-router"
import { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function UserDashboard() {

    const [donorBesicInfo, setDonorBesicInfo] = useState({});
    const stored = sessionStorage.getItem("user");
    //console.log(stored);
    
    useEffect(()=>{
        fetch(`${API_BASE}/donorInfo/${stored}`)
        .then((response) => response.json())
        .then((data) => {console.log(data);setDonorBesicInfo(data)})
        .catch((error) => console.log("Error in fetching user Information", error));
    }, [])

    //console.log(donorBesicInfo);

    return (
        <div className="bg-white">
            <div><UserNavbar donorBesicInfo={donorBesicInfo}></UserNavbar></div>
            <div className="flex">
                <Sidebar ></Sidebar>
                <div className="flex-1 w-full">
                    <Outlet context={{donorBesicInfo}}/>
                </div>
            </div>
        </div>
    )
}