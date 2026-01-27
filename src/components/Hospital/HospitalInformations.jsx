import React from "react";
import { useOutletContext } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Stethoscope } from "lucide-react";

export default function HospitalInformations() {
    const ctx = useOutletContext();
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};

    const getInitials = (name) => {
        if (!name) return "H";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const makeDisplayValue = (v) => {
        if (v === null || v === undefined || v === "") return "—";
        if (Array.isArray(v)) return v.join(", ");
        if (typeof v === "object") return JSON.stringify(v);
        return String(v);
    };

    const InfoField = ({ icon: Icon, label, value }) => (
        <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-red-500 mt-1" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-lg text-gray-900 font-semibold break-words">{value}</p>
            </div>
        </div>
    );

    const name = hospitalInfo?.hospitalName || "Hospital";
    const initials = getInitials(name);

    return (
        <div className="w-full bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Hospital Information</h1>
                    <p className="text-gray-600">View and manage your hospital details</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-red-500">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg flex items-center justify-center font-bold text-white text-3xl">
                            {initials}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{makeDisplayValue(hospitalInfo.hospitalName)}</h2>
                            <p className="text-gray-600 text-lg mt-1">Hospital ID: {makeDisplayValue(hospitalInfo.hospitalId)}</p>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        <InfoField
                            icon={Mail}
                            label="Email Address"
                            value={makeDisplayValue(hospitalInfo.adminID)}
                        />
                        <InfoField
                            icon={Phone}
                            label="Contact Number"
                            value={makeDisplayValue(hospitalInfo.hospitalContactNumber)}
                        />
                        <InfoField
                            icon={Building2}
                            label="Address"
                            value={makeDisplayValue(hospitalInfo.hospitalAddress)}
                        />
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-red-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hospitalInfo.registrationNumber && (
                            <InfoField
                                icon={Building2}
                                label="Registration Number"
                                value={makeDisplayValue(hospitalInfo.registrationNumber)}
                            />
                        )}
                        {hospitalInfo.pinCode && (
                            <InfoField
                                icon={MapPin}
                                label="Pin Code"
                                value={makeDisplayValue(hospitalInfo.pinCode)}
                            />
                        )}
                        {hospitalInfo.state && (
                            <InfoField
                                icon={MapPin}
                                label="State"
                                value={makeDisplayValue(hospitalInfo.state)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
