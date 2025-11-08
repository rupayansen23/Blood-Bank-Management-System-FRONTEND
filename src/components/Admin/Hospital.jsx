import { useEffect, useState } from "react"
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Hospital() {

    const [hospitals, setHospitals] = useState([]);
    useEffect(()=>{
        fetch(`${API_BASE}/getAllHospitals`)
        .then((response) => response.json())
        .then((data) => setHospitals(data))
        .catch((error) => console.error("Error in fetching hospitals", error));
    }, [])
    
    console.log(hospitals);

    return (
        <div className="w-[100%] h-screen ">
            <div className="w-full bg-green-200 h-[12%]">
                <div className="p-5">
                    <p className="ml-2 text-2xl font-bold">Hospital</p>
                </div>
            </div>
            <div className=" w-full h-full ">
                <div className="m-5 p-2 text-2xl">
                    <p>Hospitals List</p> 
                </div>
                <div className="ml-5 mt-2 p-2">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <td className="px-4 py-2 border">Id</td>
                                <td className="px-4 py-2 border">Name</td>
                                <td className="px-4 py-2 border">Blood Group Type</td>
                                <td className="px-4 py-2 border">Blood Amount</td>
                                <td className="px-4 py-2 border">Address</td>
                                <td className="px-4 py-2 border">Contact Number</td>
                                <td className="px-4 py-2 border">Total Receipits</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hospitals.map((hospital)=>(
                                    <tr key={hospital.hospitalId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{hospital.hospitalId}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalName}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalBloodGroupType}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalBloodAmount}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalAddress}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalContactNumber}</td>
                                        <td className="px-4 py-2 border">{hospital.totalRecipients}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}