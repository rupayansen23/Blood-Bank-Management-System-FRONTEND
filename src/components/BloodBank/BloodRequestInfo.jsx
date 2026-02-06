import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BASE_API = import.meta.env.VITE_API_BASE_URL;

export default function BloodRequestInfo() {

    const [bloodReqInfo, setBloodReqInfo] = useState([]);
    const [filter, setFilter] = useState("PENDING");

    // READ ID FROM SESSION STORAGE
    const bloodBankId = Number(sessionStorage.getItem("BloodBank"));

    /* ---------------- FETCH REQUESTS ---------------- */
    const fetchRequests = async () => {
        if (!bloodBankId) {
            toast.error("Invalid Blood Bank ID");
            return;
        }

        try {
            const res = await fetch(
                `${BASE_API}/getRequestsById/${bloodBankId}`
            );

            if (!res.ok) throw new Error();

            const data = await res.json();
            setBloodReqInfo(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to fetch requests");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    /* ---------------- UPDATE STATUS ---------------- */
    const updateStatus = async (endpoint, successMsg) => {
        try {
            const res = await fetch(endpoint, { method: "PATCH" });

            if (!res.ok) throw new Error();

            toast.success(successMsg);
            fetchRequests(); // refresh data after update
        } catch {
            toast.error("Status update failed");
        }
    };

    /* ---------------- FILTER (NULL SAFE) ---------------- */
    const filteredData = bloodReqInfo.filter(req => {
        const status = req.status ?? "PENDING"; // normalize null
        return status === filter;
    });

    return (
        <div className="w-full min-h-screen p-5">

            {/* FILTER BUTTONS */}
            <div className="flex gap-3 mb-6">
                {["PENDING", "ASSIGNED", "REJECTED", "FULFILLED"].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded font-semibold ${
                            filter === s
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* TABLE */}
            <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="border px-3 py-2">ID</th>
                        <th className="border px-3 py-2">Requester</th>
                        <th className="border px-3 py-2">Blood Group</th>
                        <th className="border px-3 py-2">Quantity</th>
                        <th className="border px-3 py-2">Priority</th>
                        <th className="border px-3 py-2">Status</th>
                        <th className="border px-3 py-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4">
                                No {filter} requests
                            </td>
                        </tr>
                    ) : (
                        filteredData.map(req => {
                            const currentStatus = req.status ?? "PENDING";

                            return (
                                <tr key={req.reqId} className="text-center">
                                    <td className="border px-3 py-2">{req.reqId}</td>
                                    <td className="border px-3 py-2">{req.requesterName}</td>
                                    <td className="border px-3 py-2">{req.bloodGroup}</td>
                                    <td className="border px-3 py-2">{req.quantity}</td>
                                    <td className="border px-3 py-2">{req.priority}</td>
                                    <td className="border px-3 py-2 font-semibold">
                                        {currentStatus}
                                    </td>

                                    <td className="border px-3 py-2">
                                        {/* PENDING → ACCEPT / REJECT */}
                                        {currentStatus === "PENDING" && (
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            `${BASE_API}/update-accepted/${req.reqId}`,
                                                            "Request accepted"
                                                        )
                                                    }
                                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            `${BASE_API}/update-rejected/${req.reqId}`,
                                                            "Request rejected"
                                                        )
                                                    }
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {/* ACCEPTED → FULFILLED */}
                                        {currentStatus === "ACCEPTED" && (
                                            <label className="flex justify-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                        updateStatus(
                                                            `${BASE_API}/update-fulfilled/${req.reqId}`,
                                                            "Request fulfilled"
                                                        )
                                                    }
                                                />
                                                Fulfilled
                                            </label>
                                        )}  

                                        

                                        {/* FINAL STATES */}
                                        {(currentStatus === "REJECTED" ||
                                            currentStatus === "FULFILLED") && "—"}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
