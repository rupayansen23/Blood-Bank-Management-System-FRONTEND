import { useEffect, useState } from "react";
import Hospital from "./Hospital";
import BloodBankForm from "../../pages/Admin/BloodBankForm";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BloodBankContent() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/getAllBloodBanks`)
      .then((response) => response.json())
      .then((data) => setBloodBanks(data || []))
      .catch((error) => console.error("Error In fetching bloodbanks", error))
      .finally(() => setLoading(false));
  }, []);

  const handleAddClick = () => setShowForm(true);

  // Called by the form when a new bank is created
  const handleSaved = (newBank) => {
    // optimistic update: place new bank at top
    setBloodBanks((prev) => [newBank, ...prev]);
    setShowForm(false);
  };

  const handleCancel = () => setShowForm(false);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full bg-green-200">
        <div className="max-w-7xl mx-auto p-5 flex items-center justify-between">
          <p className="text-2xl font-bold text-black">Blood Banks</p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddClick}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md shadow"
            >
              + Add Blood Bank
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Inline form */}
        {showForm && (
          <div className="mb-6">
            <BloodBankForm onCancel={handleCancel} onSaved={handleSaved} />
          </div>
        )}

        <div className="m-2">
          <div className="m-4 p-2 text-2xl">
            <h1>Blood Bank List</h1>
          </div>

          <div className="m-4 p-2 overflow-auto">
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 border">Id</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Address</th>
                    <th className="px-4 py-2 border">Contact Number</th>
                    <th className="px-4 py-2 border">Total Donor</th>
                    <th className="px-4 py-2 border">Total Hospital Connected</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodBanks.map((bloodBank) => (
                    <tr
                      key={bloodBank.bloodBankId ?? bloodBank.id ?? bloodBank._id}
                      className="text-center hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-2 border">
                        {bloodBank.bloodBankId ?? bloodBank.id ?? "—"}
                      </td>
                      <td className="px-4 py-2 border">{bloodBank.bloodBankName}</td>
                      <td className="px-4 py-2 border">{bloodBank.bloodBankAddress}</td>
                      <td className="px-4 py-2 border">{bloodBank.bloodBankContactNumber}</td>
                      <td className="px-4 py-2 border">{bloodBank.totalDonors ?? 0}</td>
                      <td className="px-4 py-2 border">{bloodBank.totalHospitals ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}