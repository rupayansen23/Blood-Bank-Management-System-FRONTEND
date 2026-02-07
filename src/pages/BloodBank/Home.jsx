import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Droplets, Users, Building2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BloodBankHome() {
    const ctx = useOutletContext();
    const bloodBankInfo = (ctx && (ctx.bloodBankInfo ?? ctx)) || {};
    const [bloodData, setBloodData] = useState([]);
    const [totalHospitals, setTotalHospitals] = useState(0);

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
        const bloodBankId = sessionStorage.getItem("BloodBank");
        if (bloodBankId) {
            fetch(`${API_BASE}/getBloodBankBloodGroupByBloodBankId/${bloodBankId}`)
                .then((response) => response.json())
                .then((data) => {
                    // Transform API data to chart format
                    const formattedData = data.map(item => ({
                        bloodGroup: formatBloodGroup(item.bloodBankBloodGroupType),
                        quantity: item.bloodBankBloodAmount
                    }));
                    setBloodData(formattedData);
                })
                .catch((error) => console.log("Error fetching blood inventory:", error));
        }
    }, []);

    // Fetch requests and calculate total unique hospitals
    useEffect(() => {
        const bloodBankId = sessionStorage.getItem("BloodBank");
        if (bloodBankId) {
            fetch(`${API_BASE}/getRequestsById/${bloodBankId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        // Count unique hospitals with FULFILLED status
                        const uniqueHospitals = new Set(
                            data.filter(req => req.status === "FULFILLED").map(req => req.requesterId)
                        ).size;
                        setTotalHospitals(uniqueHospitals);
                    }
                })
                .catch((error) => console.log("Error fetching requests:", error));
        }
    }, []);

    return (
        <div className="w-full bg-gray-50 p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to {bloodBankInfo.bloodBankName || 'Your Blood Bank Dashboard'}
                    </h1>
                    <p className="text-gray-600 mt-2">Manage blood inventory, donations, and requests efficiently</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 font-medium mb-2">Blood Bank Name</p>
                                <h3 className="text-2xl font-bold text-pink-600">
                                    {bloodBankInfo?.bloodBankName || 'Blood Bank'}
                                </h3>
                            </div>
                            <Building2 className="text-pink-500" size={36} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 font-medium mb-2">Total Donors</p>
                                <h3 className="text-2xl font-bold text-red-600">
                                    {bloodBankInfo?.totalDonors || '0'}
                                </h3>
                            </div>
                            <Users className="text-red-500" size={36} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-rose-400 hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 font-medium mb-2">Total Hospitals</p>
                                <h3 className="text-2xl font-bold text-rose-500">
                                    {totalHospitals}
                                </h3>
                            </div>
                            <Droplets className="text-rose-400" size={36} />
                        </div>
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
                                dataKey="quantity" 
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
