import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import BloodbankNavbar from "../../components/BloodBank/BloodbankNavbar";
import BloodBankSidebar from "../../components/BloodBank/BloodBankSidebar";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BloodBankDashbord() {

    const [bloodBankInfo, setBloodBankInfo] = useState({});
    const stored = sessionStorage.getItem("BloodBank");

    useEffect(()=>{
        fetch(`${API_BASE}/getBloodBankById/${stored}`)
        .then((response) => response.json())
        .then((data) => {console.log(data); setBloodBankInfo(data)})
        .catch((error) => console.log("Error in fetching user Information", error));
    }, [])

    return(
        <div className="bg-white">
            <div><BloodbankNavbar bloodBankInfo={bloodBankInfo}></BloodbankNavbar></div>
            <div className="flex">
                <BloodBankSidebar></BloodBankSidebar>
                <div className="flex-1 w-full">
                    <Outlet context={{bloodBankInfo}}/>
                </div>
            </div>
        </div>
    )
}