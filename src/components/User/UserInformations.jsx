import React from "react";
import { useOutletContext } from "react-router-dom";
import { User, Mail, Phone, MapPin, Droplet, Calendar, Weight } from "lucide-react";

export default function UserInformations() {
  const ctx = useOutletContext();
  const donorBesicInfo = (ctx && (ctx.donorBesicInfo ?? ctx)) || {};

  const isEmptyValue = (v) => {
    if (v === null || v === undefined || v === "") return true;
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === "object") return Object.keys(v).length === 0;
    return false;
  };

  const makeDisplayValue = (v) => {
    if (v === null || v === undefined || v === "") return "—";
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const InfoField = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-500 mt-1" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg text-gray-900 font-semibold break-words">{value}</p>
      </div>
    </div>
  );

  const name = donorBesicInfo?.donorName || "User";
  const initials = getInitials(name);

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Combined Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header and Personal Info Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Profile Header */}
              <div className="flex items-start gap-6">
                <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                  {donorBesicInfo?.donorBloodGroup && (
                    <p className="text-blue-600 font-medium mt-2 flex items-center gap-1">
                      <Droplet size={18} />
                      Blood Group: <span className="font-bold">{donorBesicInfo.donorBloodGroup}</span>
                    </p>
                  )}
                  {donorBesicInfo?.donorId && (
                    <p className="text-gray-600 font-medium mt-3">
                      Donor ID: <span className="font-semibold text-gray-900">{donorBesicInfo.donorId}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Personal Information */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {donorBesicInfo?.donorAge && (
                    <InfoField
                      icon={Calendar}
                      label="Age"
                      value={makeDisplayValue(donorBesicInfo.donorAge)}
                    />
                  )}
                  {donorBesicInfo?.donorGender && (
                    <InfoField
                      icon={User}
                      label="Gender"
                      value={makeDisplayValue(donorBesicInfo.donorGender)}
                    />
                  )}
                  {donorBesicInfo?.donorWeight && (
                    <InfoField
                      icon={Weight}
                      label="Weight"
                      value={`${makeDisplayValue(donorBesicInfo.donorWeight)} kg`}
                    />
                  )}
                  {donorBesicInfo?.donorBloodGroup && (
                    <InfoField
                      icon={Droplet}
                      label="Blood Type"
                      value={makeDisplayValue(donorBesicInfo.donorBloodGroup)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          {(donorBesicInfo?.donorEmailId || donorBesicInfo?.donorContactNumber || donorBesicInfo?.donorAddress) && (
            <div className="p-8 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {donorBesicInfo?.donorEmailId && (
                  <InfoField
                    icon={Mail}
                    label="Email"
                    value={makeDisplayValue(donorBesicInfo.donorEmailId)}
                  />
                )}
                {donorBesicInfo?.donorContactNumber && (
                  <InfoField
                    icon={Phone}
                    label="Phone"
                    value={makeDisplayValue(donorBesicInfo.donorContactNumber)}
                  />
                )}
                {donorBesicInfo?.donorAddress && (
                  <InfoField
                    icon={MapPin}
                    label="Location"
                    value={makeDisplayValue(donorBesicInfo.donorAddress)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}