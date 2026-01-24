import { useEffect, useState } from "react";
import { Users, Building2, Droplet } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminHome() {
    const [usersCount, setUsersCount] = useState(0);
    const [hospitalsCount, setHospitalsCount] = useState(0);
    const [bloodBanksCount, setBloodBanksCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch total users
                const usersRes = await fetch(`${API_BASE}/getAllDonors`);
                const usersData = await usersRes.json();
                setUsersCount(Array.isArray(usersData) ? usersData.length : 0);

                // Fetch total hospitals
                const hospitalsRes = await fetch(`${API_BASE}/getAllHospitals`);
                const hospitalsData = await hospitalsRes.json();
                setHospitalsCount(Array.isArray(hospitalsData) ? hospitalsData.length : 0);

                // Fetch total blood banks
                const bloodBanksRes = await fetch(`${API_BASE}/getAllBloodBanks`);
                const bloodBanksData = await bloodBanksRes.json();
                setBloodBanksCount(Array.isArray(bloodBanksData) ? bloodBanksData.length : 0);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const StatCard = ({ icon: Icon, title, count, bgColor, iconColor }) => (
        <div className={`${bgColor} rounded-lg shadow-lg p-6 text-white min-w-[250px] transition-transform hover:scale-105`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-200 text-sm font-medium">{title}</p>
                    <p className="text-4xl font-bold mt-2">{loading ? "-" : count}</p>
                </div>
                <div className={`${iconColor} p-4 rounded-full`}>
                    <Icon size={32} className="text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-[100%] h-screen flex flex-col">
            <div className="w-full bg-green-100 h-[12%] flex-shrink-0">
                <div className="p-5">
                    <p className="ml-2 text-2xl font-bold">Home</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        icon={Users}
                        title="Total Users"
                        count={usersCount}
                        bgColor="bg-blue-500"
                        iconColor="bg-blue-600"
                    />
                    <StatCard
                        icon={Building2}
                        title="Total Hospitals"
                        count={hospitalsCount}
                        bgColor="bg-purple-500"
                        iconColor="bg-purple-600"
                    />
                    <StatCard
                        icon={Droplet}
                        title="Total Blood Banks"
                        count={bloodBanksCount}
                        bgColor="bg-red-500"
                        iconColor="bg-red-600"
                    />
                </div>

                <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-600">Active Users</p>
                            <p className="text-2xl font-bold text-blue-500">{usersCount}</p>
                        </div>
                        <div className="p-4 border-l-4 border-purple-500">
                            <p className="text-sm text-gray-600">Registered Hospitals</p>
                            <p className="text-2xl font-bold text-purple-500">{hospitalsCount}</p>
                        </div>
                        <div className="p-4 border-l-4 border-red-500">
                            <p className="text-sm text-gray-600">Blood Banks</p>
                            <p className="text-2xl font-bold text-red-500">{bloodBanksCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}