import { useOutletContext, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function HospitalHome() {
    const navigate = useNavigate();
    const ctx = useOutletContext();
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};

    // Sample blood inventory data by blood group
    const bloodData = [
        { bloodGroup: "O+", amount: 45 },
        { bloodGroup: "O-", amount: 32 },
        { bloodGroup: "A+", amount: 38 },
        { bloodGroup: "A-", amount: 28 },
        { bloodGroup: "B+", amount: 42 },
        { bloodGroup: "B-", amount: 25 },
        { bloodGroup: "AB+", amount: 20 },
        { bloodGroup: "AB-", amount: 15 },
    ];

    return (
        <div className="w-full bg-gray-50 p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to Your Dashboard, {hospitalInfo.hospitalName}
                    </h1>
                    <p className="text-gray-600 mt-2">Manage blood requests and hospital information efficiently</p>
                </div>

                {/* Quick Actions */}
                <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>

                        <div className="flex gap-4 flex-nowrap">
                            <button
                                onClick={() => navigate("/hospital/dashbord/requests")}
                                className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                            >
                                Request Blood
                            </button>

                            <button
                                onClick={() => navigate("/hospital/dashbord/requests")}
                                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                            >
                                View Your Requests
                            </button>

                            <button
                                onClick={() => navigate("/hospital/dashbord/info")}
                                className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                {/* Blood Groups Bar Chart */}
                <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Blood Inventory by Blood Group</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={bloodData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="bloodGroup" stroke="#666" />
                            <YAxis stroke="#666" label={{ value: "Units (ml)", angle: -90, position: "insideLeft" }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
                                formatter={(value) => `${value} units`}
                            />
                            <Legend />
                            <Bar 
                                dataKey="amount" 
                                name="Available Units" 
                                fill="#ef4444" 
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Important Note */}
                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                    <div className="flex gap-4">
                        <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-yellow-800 mb-2">Important Notice</h3>
                            <p className="text-yellow-700">
                                For urgent blood requests, please make sure to set the priority to CRITICAL and provide accurate recipient information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
