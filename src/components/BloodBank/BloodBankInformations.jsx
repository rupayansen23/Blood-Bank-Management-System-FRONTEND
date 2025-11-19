import { useOutletContext } from "react-router";

export default function BloodBankInformations() {
  const ctx = useOutletContext();
  const bloodBankInfo = (ctx && (ctx.bloodBankInfo ?? ctx)) || {};

  // preferred order (no password)
  const preferredOrder = [
    "bloodBankName",
    "bloodBankAddress",
    "bloodBankContactNumber",
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

  // gather keys and explicitly exclude password
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="m-3 p-2 text-2xl font-semibold">Blood Bank Information</h1>

      {visibleKeys.length === 0 ? (
        <div className="p-6 bg-yellow-50 text-yellow-800 rounded">No information available.</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-100 shadow-sm">
          <table className="w-full table-auto bg-white">
            <tbody className="divide-y divide-gray-100">
              {visibleKeys.map((key) => (
                <tr key={key} className="odd:bg-gray-50">
                  <th className="w-1/3 text-left px-6 py-4 font-medium text-gray-700">
                    {labelFor(key)}
                  </th>
                  <td className="w-2/3 px-6 py-4 text-gray-800">
                    {makeDisplayValue(bloodBankInfo[key])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}