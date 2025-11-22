import { useEffect, useState } from "react"
const BASE_API = import.meta.env.VITE_API_BASE_URL;

export default function BloodRequestInfo() {

    const [bloodReqInfo, setBloodReqInfo] = useState([])
    const stored = sessionStorage.getItem("BloodBank");

    useEffect(()=>{
        fetch(`${BASE_API}/getRequestsById/${stored}`)
        .then((response) => response.json())
        .then((data) => setBloodReqInfo(data))
        .catch((error) => console.error("Error in fetching Blood Request data", error));
    }, [])

    console.log(bloodReqInfo);

    return(
        <div className="w-[100%] h-screen ">
            <div className=" w-full h-full ">
                <div className="m-5 p-2 text-2xl">
                    <p>Pending Requests</p> 
                </div>
                <div className="ml-5 mt-2 p-2">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <td className="px-4 py-2 border">Request Id</td>
                                <td className="px-4 py-2 border">Requester Name</td>
                                <td className="px-4 py-2 border">Blood Group</td>
                                <td className="px-4 py-2 border">Quantigy</td>
                                <td className="px-4 py-2 border">priority</td>
                                <td className="px-4 py-2 border">Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bloodReqInfo.map((bloodReqInfo)=>(
                                    <tr key={bloodReqInfo.reqId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{bloodReqInfo.reqId}</td>
                                        <td className="px-4 py-2 border">{bloodReqInfo.requesterName}</td>
                                        <td className="px-4 py-2 border">{bloodReqInfo.bloodGroup}</td>
                                        <td className="px-4 py-2 border">{bloodReqInfo.quantity}</td>
                                        <td className="px-4 py-2 border">{bloodReqInfo.priority}</td>
                                        <td className="px-4 py-2 border">{bloodReqInfo.status}</td>
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