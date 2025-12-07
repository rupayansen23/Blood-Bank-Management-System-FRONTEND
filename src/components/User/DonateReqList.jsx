import { useEffect, useState } from "react"
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function DonateReqList() {

    const [donateReqList, setDonateReqList] = useState([]);
    const store = sessionStorage.getItem("user");

    console.log(store);

    useEffect(()=>{
        fetch(`${API_BASE}/getReqByUserId/${store}`) 
        .then((response)=>response.json())
        .then((data)=>setDonateReqList(data))
        .catch((error) => console.log("Error Occurs in fetching information from api", error));
    }, [])

    console.log(donateReqList);

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
                                <td className="px-4 py-2 border">Gender</td>
                                <td className="px-4 py-2 border">Status</td>
                                <td className="px-4 py-2 border">Requested Blood Bank</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donateReqList.map((data)=>(
                                    <tr key={data.reqId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{data.requestId}</td>
                                        <td className="px-4 py-2 border">{data.donorDTO.donorName}</td>
                                        <td className="px-4 py-2 border">{data.donorDTO.donorBloodGroup}</td>
                                        <td className="px-4 py-2 border">{data.unites}</td>
                                        <td className="px-4 py-2 border">{data.donorDTO.donorGender}</td>
                                        <td className="px-4 py-2 border">{data.requestStatus}</td>
                                        <td className="px-4 py-2 border">{data.bloodBankName}</td>
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