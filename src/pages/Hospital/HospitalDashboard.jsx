import HospitalNavbar from "../../components/Hospital/HospitalNavbar";
import HospitalSidebar from "../../components/Hospital/HospitalSidebar";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function HospitalDashboard() {
    const [hospitalInfo, setHospitalInfo] = useState({});
    const stored = sessionStorage.getItem("hospital");

    useEffect(() => {
        fetch(`${API_BASE}/hospitalInfo/${stored}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHospitalInfo(data);
            })
            .catch((error) => console.log("Error in fetching hospital information", error));
    }, []);

    return (
        <div className="bg-white">
            <div>
                <HospitalNavbar hospitalInfo={hospitalInfo} />
            </div>
            <div className="flex">
                <HospitalSidebar />
                <div className="flex-1 w-full">
                    <Outlet context={{ hospitalInfo }} />
                </div>
            </div>
        </div>
    );
}