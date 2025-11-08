import { useEffect, useState } from "react";
import Hospital from "./Hospital";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BloodBankContent() {

    const [bloodBanks, setBloodBanks] = useState([]);
    useEffect(()=>{
        fetch(`${API_BASE}/getAllBloodBanks`)
        .then((response) => response.json())
        .then((data)=> setBloodBanks(data))
        .catch((error) => console.error("Error In fetching bloodbanks", error));
    }, [])

    console.log(bloodBanks);

    return(
        <div className="w-[100%] h-screen ">
            <div className="w-full bg-green-200 h-[12%]">
                <div className="p-5">
                    <p className="ml-2 text-2xl font-bold text-black">Blood Banks</p>
                </div>
            </div>
            <div>
                <div className="m-2">
                    <div className="m-4 p-2 text-2xl">
                        <h1>Blood Bank List</h1>
                    </div>      
                    <div className="m-4 p-2">
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="px-4 py-2 border">Id</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Address</th>
                                    <th className="px-4 py-2 border">Contact Number</th>
                                    <th className="px-4 py-2 border">Total Donor</th>
                                    <th className="px-4 py-2 border">Total Hospital Connected</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bloodBanks.map((bloodBank)=>(
                                        <tr key={bloodBank.bloodBankId} className="text-center hover:bg-blue-50 transition">
                                            <td className="px-4 py-2 border">{bloodBank.bloodBankId}</td>
                                            <td className="px-4 py-2 border">{bloodBank.bloodBankName}</td>
                                            <td className="px-4 py-2 border">{bloodBank.bloodBankAddress}</td>
                                            <td className="px-4 py-2 border">{bloodBank.bloodBankContactNumber}</td>
                                            <td className="px-4 py-2 border">{bloodBank.totalDonors}</td>
                                            <td className="px-4 py-2 border">{bloodBank.totalHospitals}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>  
            </div>
        </div>
    )
}