import { useOutletContext } from "react-router-dom";
import { Heart, Users, Droplet, AlertCircle } from "lucide-react";

export default function HospitalHome() {
    const ctx = useOutletContext();
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className={`${color} rounded-lg shadow-md p-6 flex items-center gap-4`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white`}>
                <Icon size={32} />
            </div>
            <div>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-white text-3xl font-bold">{value}</p>
            </div>
        </div>
    );

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

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Heart}
                        label="Hospital Status"
                        value="Active"
                        color="bg-gradient-to-br from-red-500 to-red-600"
                    />
                    <StatCard
                        icon={Droplet}
                        label="Blood Groups"
                        value="8"
                        color="bg-gradient-to-br from-orange-500 to-orange-600"
                    />
                    <StatCard
                        icon={Users}
                        label="Location"
                        value={hospitalInfo.city || "—"}
                        color="bg-gradient-to-br from-blue-500 to-blue-600"
                    />
                    <StatCard
                        icon={AlertCircle}
                        label="Contact"
                        value={hospitalInfo.contactNumber || "—"}
                        color="bg-gradient-to-br from-purple-500 to-purple-600"
                    />
                </div>

                {/* Information Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Hospital Details */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hospital Details</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-gray-600 font-medium">Hospital Name:</span>
                                <span className="text-gray-900 font-semibold">{hospitalInfo.hospitalName || "—"}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-gray-600 font-medium">City:</span>
                                <span className="text-gray-900 font-semibold">{hospitalInfo.city || "—"}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                <span className="text-gray-600 font-medium">Email:</span>
                                <span className="text-gray-900 font-semibold break-all">{hospitalInfo.email || "—"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Contact:</span>
                                <span className="text-gray-900 font-semibold">{hospitalInfo.contactNumber || "—"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg">
                                Request Blood
                            </button>
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg">
                                View Your Requests
                            </button>
                            <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg">
                                Update Profile
                            </button>
                        </div>
                    </div>
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
