import { useEffect, useState } from "react"
const BASE_API = import.meta.env.VITE_API_BASE_URL;

export default function UserDonateRequests() {

    const [donateReqInfo, setDonateReqInfo] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filterMode, setFilterMode]  = useState("PENDING");

    const stored = sessionStorage.getItem("BloodBank");
    
     useEffect(()=>{
        fetch(`${BASE_API}/getReqByBloodBankId/${stored}`)
        .then((response) => response.json())
        .then((data) => setDonateReqInfo(data))
        // .then((donateReqInfo) => filterPending(donateReqInfo))
        .catch((error) => console.error("Error in fetching Donate Request Request data", error));
    }, [stored]);

    console.log(donateReqInfo);
    
    useEffect(()=>{
        if(!Array.isArray(donateReqInfo)) {
            setFilteredData([]);
            return;
        }        
        const mode = filterMode;
        if(mode === "PENDING") {
            setFilteredData(donateReqInfo.filter((data) => data.requestStatus === "PENDING"));
        } else if(mode === "FULFILED") {
            setFilteredData(donateReqInfo.filter((data) => data.requestStatus === "FULFILLED"));
        } else if(mode === "ASSIGNED") {
            setFilteredData(donateReqInfo.filter((data) => data.requestStatus === "ASSIGNED"));
        } else {
            setFilteredData(donateReqInfo);
        }
    }, [filterMode, donateReqInfo])


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
                    body : JSON.stringify({status:newStatus, bloodBankId:stored})
                }
            );
            if(!resp.ok) throw new Error("Failed to update status");
            const updateRequest = await resp.json();
            setDonateReqInfo(
                (prev) => prev.map((sinReq)=> sinReq.requestId === requestId ? { ...sinReq, requestStatus: updateRequest.status } : sinReq)
            );
        }
        catch(err) {
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleStatusChange2 = async(requestId, newStatus) => {
        try {
            const resp = await fetch(
                `${BASE_API}/fulfil-donate-req/${requestId}`,
                {
                    method: "PATCH",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({status:newStatus, bloodBankId:stored})
                }
            );
            if(!resp.ok) throw new Error("Failed to update status");
            const updateRequest = await resp.json();
            setDonateReqInfo((prev) =>
                prev.map((sinReq) =>
                    sinReq.requestId === requestId ? { ...sinReq, requestStatus: updateRequest.status } : sinReq
                )
            );
        }
        catch(err) {
            console.error(err);
        }
    }

    const showActions = filterMode === "PENDING";
    const showFulfilledColumn = filterMode === "ASSIGNED";
    
    console.log(donateReqInfo);

    return(
        <div className="w-[100%] h-screen ">
            <div className=" w-full h-full ">
                <div className="ml-5 mt-5">
                    <button 
                        className="px-3 py-1 ml-5  rounded bg-red-700 text-white text-sm disabled:opacity-50 cursor-pointer" 
                        onClick={()=>setFilterMode("PENDING")}
                    >Pending
                    </button>
                    <button 
                        className="px-3 py-1 ml-5 rounded bg-red-700 text-white text-sm disabled:opacity-50 cursor-pointer" 
                        onClick={()=>setFilterMode("ASSIGNED")}
                    >Assigned
                    </button>
                    <button 
                        className="px-3 py-1 ml-5 rounded bg-red-700 text-white text-sm disabled:opacity-50 cursor-pointer" 
                        onClick={()=>setFilterMode("FULFILED")}
                    >Fulfiled
                    </button>
                </div>
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
                                <td className="px-4 py-2 border">Quantity</td>
                                <td className="px-4 py-2 border">Gender</td>
                                <td className="px-4 py-2 border">Status</td>
                                <td className="px-4 py-2 border">Requested At</td>
                                {showActions && <td className="px-4 py-2 border">Actions</td>}
                                {showFulfilledColumn && <td className="px-4 py-2 border">Fulfilled</td>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.map((data)=>(
                                    <tr key={data.requestId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{data?.requestId}</td>
                                        <td className="px-4 py-2 border">{data?.donorDTO?.donorName}</td>
                                        <td className="px-4 py-2 border">{data?.donorDTO?.donorBloodGroup}</td>
                                        <td className="px-4 py-2 border">{data?.unites}</td>
                                        <td className="px-4 py-2 border">{data?.donorDTO?.donorGender}</td>
                                        <td className="px-4 py-2 border">{data?.requestStatus}</td>
                                        <td className="px-4 py-2 border">
                                            {data?.requestedAt
                                                ? new Date(data.requestedAt).toLocaleString('en-IN', {
                                                      year: 'numeric',
                                                      month: 'short',
                                                      day: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit'
                                                  })
                                                : '—'}
                                        </td>
                                        {
                                            showActions && <td className="border px-4 py-2 space-x-2">
                                            <button
                                                className="px-3 py-1 rounded bg-green-500 text-white text-sm disabled:opacity-50 cursor-pointer"
                                                onClick={() => handleStatusChange(data.requestId, "ASSIGNED")}
                                                disabled={updatingId === data.reqId}
                                            >
                                                {updatingId === data.id ? "Updating..." : "Accept"}
                                            </button>
                                            <button
                                                className="px-3 py-1 rounded bg-red-500 text-white text-sm disabled:opacity-50 cursor-pointer"
                                                onClick={() => handleStatusChange(data.id, "REJECTED")}
                                                disabled={updatingId === data.requestId}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                        }
                                         {showFulfilledColumn && (
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 cursor-pointer"
                                                    onChange={() => handleStatusChange2(data.requestId, "FULFILLED")}
                                                />
                                            </td>
                                        )}

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