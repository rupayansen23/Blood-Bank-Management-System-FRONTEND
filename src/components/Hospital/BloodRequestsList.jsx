import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus, Filter } from "lucide-react";
import BloodRequestForm from "./BloodRequestForm";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const BLOOD_GROUPS = [
    "All",
    "A_POS",
    "A_NEG",
    "B_POS",
    "B_NEG",
    "AB_POS",
    "AB_NEG",
    "O_POS",
    "O_NEG"
];

export default function BloodRequestsList() {
    const ctx = useOutletContext();
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};
    const hospitalId = hospitalInfo.hospitalId;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState('ALL');
    const [bloodGroupFilter, setBloodGroupFilter] = useState('All');
    
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/bloodReqByHospital/${hospitalId}`);
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

    // Filtered requests based on priority and blood group
    const filteredRequests = requests.filter(r => {
        const priorityMatch = priorityFilter === 'ALL' || r.priority === priorityFilter;
        const bloodGroupMatch = bloodGroupFilter === 'All' || r.bloodGroup === bloodGroupFilter;
        return priorityMatch && bloodGroupMatch;
    });

    return (
        <div className="w-full bg-white p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-red-600 drop-shadow-lg">Blood Requests</h1>
                            <p className="text-gray-700 mt-2 text-lg">Manage your blood requests here</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                        >
                            <Plus size={22} />
                            New Request
                        </button>
                    </div>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center mt-4 bg-white rounded-lg shadow px-6 py-4 border border-red-100">
                        <div className="flex items-center gap-2">
                            <Filter className="text-red-400" size={18} />
                            <span className="font-semibold text-gray-700">Priority:</span>
                            <select
                                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
                                value={priorityFilter}
                                onChange={e => setPriorityFilter(e.target.value)}
                            >
                                <option value="ALL">All</option>
                                <option value="CRITICAL">Critical</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="text-red-400" size={18} />
                            <span className="font-semibold text-gray-700">Blood Group:</span>
                            <select
                                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
                                value={bloodGroupFilter}
                                onChange={e => setBloodGroupFilter(e.target.value)}
                            >
                                {BLOOD_GROUPS.map(bg => (
                                    <option key={bg} value={bg}>{bg === 'All' ? 'All' : bg.replace('_POS', '+').replace('_NEG', '-')}</option>
                                ))}
                            </select>
                        </div>
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
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 text-lg">Loading requests...</p>
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 text-lg">No blood requests made yet</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-lg transition"
                            >
                                Create Your First Request
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <table className="w-full min-w-[700px]">
                                <thead className="bg-gradient-to-r from-red-100 to-pink-100 border-b-2 border-red-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Request ID</th>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Blood Group</th>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Quantity</th>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Priority</th>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Request To</th>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-extrabold text-red-700 tracking-wider">Requested At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((request, index) => (
                                        <tr
                                            key={request.reqId || index}
                                            className="border-b border-gray-200 hover:bg-pink-50 transition"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700 font-bold">
                                                #{request.reqId}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="inline-block px-4 py-2 bg-red-100 text-red-800 border border-red-300 rounded-full font-bold shadow-sm">
                                                    {request.bloodGroup?.replace("_", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700">
                                                {request.quantity} units
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-block px-4 py-2 border rounded-full font-bold shadow-sm ${getPriorityColor(
                                                        request.priority
                                                    )}`}
                                                >
                                                    {request.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {request.bloodBankName}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-block px-4 py-2 border rounded-full font-bold shadow-sm ${getStatusColor(
                                                        request.status
                                                    )}`}
                                                >
                                                    {request.status || "PENDING"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {request.requestDateTime
                                                    ? new Date(request.requestDateTime).toLocaleString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
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
