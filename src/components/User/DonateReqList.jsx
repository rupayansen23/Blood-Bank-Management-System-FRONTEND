import { useEffect, useState } from "react";
import DonateRequestForm from "./DonateRequestForm"; // adjust path if needed
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function DonateReqList() {
  const [donateReqList, setDonateReqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const store = sessionStorage.getItem("user");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/getReqByUserId/${store}`)
      .then((response) => response.json())
      .then((data) => setDonateReqList(Array.isArray(data) ? data : []))
      .catch((error) =>
        console.error("Error Occurs in fetching information from api", error)
      )
      .finally(() => setLoading(false));
  }, [store]);

  // callback when form creates a new request
  const handleCreated = (createdItem) => {
    // prepend new item to list to show newly created request
    setDonateReqList((prev) => [createdItem, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="w-[100%] h-screen ">
      <div className="w-full h-full ">
        <div className="m-5 p-2 text-2xl flex items-center justify-between">
          <p>Pending Requests</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              + Create Donate Request
            </button>
          </div>
        </div>

        {/* Inline form area (toggle) */}
        {showForm && (
          <div className="mx-5 mb-4 p-4 bg-white rounded shadow">
            <DonateRequestForm
              onSaved={handleCreated}
              onCancel={() => setShowForm(false)}
              // pass user id if needed by form:
              userId={store}
            />
          </div>
        )}

        <div className="ml-5 mt-2 p-2">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <td className="px-4 py-2 border">Request Id</td>
                  <td className="px-4 py-2 border">Requester Name</td>
                  <td className="px-4 py-2 border">Blood Group</td>
                  <td className="px-4 py-2 border">Quantity</td>
                  <td className="px-4 py-2 border">Gender</td>
                  <td className="px-4 py-2 border">Status</td>
                  <td className="px-4 py-2 border">Requested At</td>
                  <td className="px-4 py-2 border">Requested Blood Bank</td>
                </tr>
              </thead>
              <tbody>
                {donateReqList.map((data) => (
                  <tr
                    key={data.reqId ?? data.requestId ?? Math.random()}
                    className="text-center hover:bg-blue-50 transition"
                  >
                    <td className="px-4 py-2 border">{data?.requestId ?? data?.reqId}</td>
                    <td className="px-4 py-2 border">{data?.donorDTO?.donorName ?? "-"}</td>
                    <td className="px-4 py-2 border">{data?.donorDTO?.donorBloodGroup ?? "-"}</td>
                    <td className="px-4 py-2 border">{data?.unites ?? data?.units ?? "-"}</td>
                    <td className="px-4 py-2 border">{data?.donorDTO?.donorGender ?? "-"}</td>
                    <td className="px-4 py-2 border">{data?.requestStatus ?? "-"}</td>
                    <td className="px-4 py-2 border">
                      {data?.requestedAt
                        ? new Date(data.requestedAt).toLocaleString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                          })
                        : '—'}
                    </td>
                    <td className="px-4 py-2 border">{data?.bloodBankName ?? data?.bloodBank?.bloodBankName ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
