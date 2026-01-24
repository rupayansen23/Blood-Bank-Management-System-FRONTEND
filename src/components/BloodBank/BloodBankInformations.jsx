import { useOutletContext } from "react-router";

export default function BloodBankInformations() {
  const ctx = useOutletContext();
  const bloodBankInfo = (ctx && (ctx.bloodBankInfo ?? ctx)) || {};

  const preferredOrder = [
    "bloodBankName",
    "bloodBankContactNumber",
    "bloodBankAddress",
    "userId",
    "totalDonors",
    "totalHospitals",
  ];

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

  const allKeys = Object.keys(bloodBankInfo || {}).filter(
    (k) => k !== "password" && k !== "confirmPassword"
  );
  const orderedKeys = [
    ...preferredOrder.filter((k) => allKeys.includes(k)),
    ...allKeys.filter((k) => !preferredOrder.includes(k)),
  ];

  const visibleKeys = orderedKeys.filter((k) => !isEmptyValue(bloodBankInfo?.[k]));

  const labelFor = (key) =>
    ({
      bloodBankName: "Blood Bank Name",
      bloodBankAddress: "Address",
      bloodBankContactNumber: "Contact Number",
      userId: "User ID",
      totalDonors: "Total Donors",
      totalHospitals: "Total Hospitals",
    }[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase()));

  const name = makeDisplayValue(bloodBankInfo.bloodBankName || bloodBankInfo.name);
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "BB";

  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      {visibleKeys.length === 0 ? (
        <div className="p-6 bg-yellow-50 text-yellow-800 rounded">No information available.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:flex md:items-center md:gap-6">
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-red-100 text-red-700 text-3xl font-bold">
              {initials}
            </div>

            <div className="mt-4 md:mt-0 md:flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{makeDisplayValue(bloodBankInfo.bloodBankAddress)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{labelFor('userId')}</p>
                  <p className="font-medium text-gray-800">{makeDisplayValue(bloodBankInfo.userId)}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Contact</p>
                  <p className="font-medium">{makeDisplayValue(bloodBankInfo.bloodBankContactNumber)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Total Donors</p>
                  <p className="font-medium">{makeDisplayValue(bloodBankInfo.totalDonors)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Total Hospitals</p>
                  <p className="font-medium">{makeDisplayValue(bloodBankInfo.totalHospitals)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 px-6 py-5">
            <h3 className="text-lg font-medium mb-3">Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {visibleKeys.map((key) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-36 text-sm text-gray-600">{labelFor(key)}</div>
                  <div className="text-sm text-gray-800">{makeDisplayValue(bloodBankInfo[key])}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}