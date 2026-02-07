import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function HospitalHome() {
    const navigate = useNavigate();
    const ctx = useOutletContext();
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};
    const [bloodData, setBloodData] = useState([]);

    // Function to transform blood group type from API format to display format
    const formatBloodGroup = (type) => {
        const mapping = {
            "O_POS": "O+",
            "O_NEG": "O-",
            "A_POS": "A+",
            "A_NEG": "A-",
            "B_POS": "B+",
            "B_NEG": "B-",
            "AB_POS": "AB+",
            "AB_NEG": "AB-"
        };
        return mapping[type] || type;
    };

    // Fetch blood inventory data from API
    useEffect(() => {
        const hospitalId = sessionStorage.getItem("hospital");
        if (hospitalId) {
            fetch(`${API_BASE}/getAvalableBloodsByHospitalId/${hospitalId}`)
                .then((response) => response.json())
                .then((data) => {
                    // Transform API data to chart format
                    const formattedData = data.map(item => ({
                        bloodGroup: formatBloodGroup(item.hospitalBloodGroupType),
                        amount: item.hospitalBloodAmount
                    }));
                    setBloodData(formattedData);
                })
                .catch((error) => console.log("Error fetching blood inventory:", error));
        }
    }, []);

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
                                Your Profile
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
            </div>
        </div>
    );
}
