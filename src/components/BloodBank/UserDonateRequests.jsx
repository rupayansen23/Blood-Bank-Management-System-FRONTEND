import { useEffect, useState } from "react"
const BASE_API = import.meta.env.VITE_API_BASE_URL;

export default function UserDonateRequests() {

    const [donateReqInfo, setDonateReqInfo] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);
    const stored = sessionStorage.getItem("BloodBank");

     useEffect(()=>{
        fetch(`${BASE_API}/getReqByBloodBankId/${stored}`)
        .then((response) => response.json())
        .then((data) => setDonateReqInfo(data))
        .catch((error) => console.error("Error in fetching Donate Request Request data", error));
    }, [])
    
    const handleStatusChange = async (requestId, newStatus)=>{
        try {
            setUpdatingId(requestId);
            const resp = await fetch(
                `${BASE_API}/donate-request/${requestId}`,
                {
                    method : "PATCH",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({status:newStatus})
                }
            );
            if(!resp.ok) throw new Error("Failed to update status");
            const updateRequest = resp.json();
            setDonateReqInfo(
                (prev) => prev.map((sinReq)=> sinReq.reqId === requestId ? sinReq.requestStatus = updateRequest.status : sinReq.requestStatus)
            );
        }
        catch(err) {
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

    console.log(donateReqInfo);

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
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donateReqInfo.map((data)=>(
                                    <tr key={data.reqId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{data.reqId}</td>
                                        <td className="px-4 py-2 border">{data.donor.donorName}</td>
                                        <td className="px-4 py-2 border">{data.bloodGroup}</td>
                                        <td className="px-4 py-2 border">{data.units}</td>
                                        <td className="px-4 py-2 border">{data.donor.donorGender}</td>
                                        <td className="px-4 py-2 border">{data.requestStatus}</td>
                                        <td className="border px-4 py-2 space-x-2">
                                        <button
                                            className="px-3 py-1 rounded bg-green-500 text-white text-sm disabled:opacity-50 cursor-pointer"
                                            onClick={() => handleStatusChange(data.id, "ASSIGNED")}
                                            disabled={updatingId === data.id}
                                        >
                                            {updatingId === data.id ? "Updating..." : "Accept"}
                                        </button>
                                        <button
                                            className="px-3 py-1 rounded bg-red-500 text-white text-sm disabled:opacity-50 cursor-pointer"
                                            onClick={() => handleStatusChange(data.id, "REJECTED")}
                                            disabled={updatingId === data.id}
                                        >
                                            Reject
                                        </button>
                                        </td>
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