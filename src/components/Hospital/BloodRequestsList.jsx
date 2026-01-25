import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import BloodRequestForm from "./BloodRequestForm";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BloodRequestsList() {
    const ctx = useOutletContext();
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};
    const hospitalId = hospitalInfo.id;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/bloodRequests/${hospitalId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch requests");
            }
            const data = await res.json();
            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log("Error fetching requests:", error);
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hospitalId) {
            fetchRequests();
        }
    }, [hospitalId]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "CRITICAL":
                return "bg-red-100 text-red-800 border-red-300";
            case "HIGH":
                return "bg-orange-100 text-orange-800 border-orange-300";
            case "MEDIUM":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "LOW":
                return "bg-green-100 text-green-800 border-green-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "FULFILLED":
                return "bg-green-100 text-green-800 border-green-300";
            case "CANCELLED":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    return (
        <div className="w-full bg-gray-50 p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Blood Requests</h1>
                            <p className="text-gray-600 mt-2">Manage your blood requests here</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
                        >
                            <Plus size={20} />
                            New Request
                        </button>
                    </div>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <BloodRequestForm
                        onClose={() => setShowForm(false)}
                        onSuccess={fetchRequests}
                    />
                )}

                {/* Requests Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 text-lg">Loading requests...</p>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 text-lg">No blood requests made yet</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                            >
                                Create Your First Request
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b-2 border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Request ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Blood Group</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Quantity</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Priority</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Request To</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request, index) => (
                                        <tr
                                            key={request.id || index}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                                                #{request.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="inline-block px-4 py-2 bg-red-100 text-red-800 border border-red-300 rounded-full font-semibold">
                                                    {request.bloodGroup?.replace("_", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                                                {request.quantity} units
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-block px-4 py-2 border rounded-full font-semibold ${getPriorityColor(
                                                        request.priority
                                                    )}`}
                                                >
                                                    {request.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {request.requestTo}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-block px-4 py-2 border rounded-full font-semibold ${getStatusColor(
                                                        request.status
                                                    )}`}
                                                >
                                                    {request.status || "PENDING"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {request.createdAt
                                                    ? new Date(request.createdAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                      })
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
