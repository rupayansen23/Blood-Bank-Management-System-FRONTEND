import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// ------------------- SCHEMA -------------------
const donorSchema = z.object({
  donorName: z.string().min(2, "Name is required"),
  donorAge: z.string().min(1, "Age required"),
  donorGender: z.string().min(1, "Gender required"),
  donorWeight: z.string().min(1, "Weight required"),
  donorBloodGroup: z.string().min(1, "Blood group required"),
  donorAddress: z.string().min(3, "Address required"),
  donorContactNumber: z
    .string()
    .min(10, "Contact must be 10 digits")
    .max(10, "Contact must be 10 digits"),
  donorEmailId: z.string().email("Invalid email format"),
});

const formSchema = z.object({
  donor: donorSchema,
  bloodBankId: z.string().min(1, "Select a blood bank"),
  unites: z.string().min(1, "Units required"),
});

// ------------------- MAIN COMPONENT -------------------
export default function DonateRequestForm({ onSaved, onCancel }) {
  const ctx = useOutletContext();
  const donorBesicInfo =
    (ctx && (ctx.donorBesicInfo ?? ctx)) || {}; // fallback logic

  const [bloodBanks, setBloodBanks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ------------------- Disable Logic -------------------
  const isFieldDisabled = (fieldName) => {
    const val = donorBesicInfo[fieldName];
    return val !== undefined && val !== null && val !== "";
  };

  // ------------------- useForm with default values -------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donor: {
        donorName: donorBesicInfo.donorName ?? "",
        donorAge: donorBesicInfo.donorAge?.toString() ?? "",
        donorGender: donorBesicInfo.donorGender ?? "",
        donorWeight: donorBesicInfo.donorWeight ?? "",
        donorBloodGroup: donorBesicInfo.donorBloodGroup ?? BLOOD_GROUPS[0],
        donorAddress: donorBesicInfo.donorAddress ?? "",
        donorContactNumber: donorBesicInfo.donorContactNumber ?? "",
        donorEmailId: donorBesicInfo.donorEmailId ?? "",
      },
      bloodBankId: "",
      unites: "",
    },
  });

  // ------------------- Load Blood Banks -------------------
  useEffect(() => {
    fetch(`${API_BASE}/getAllBloodBanks`)
      .then((res) => res.json())
      .then((data) => setBloodBanks(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load blood banks:", err));
  }, []);

  // ------------------- SUBMIT -------------------
  const onSubmit = async (values) => {
    setSaving(true);
    setErrorMsg("");

    const payload = {
      donorDTO: {
        donorId: donorBesicInfo.donorId ?? 0,
        donorName: values.donor.donorName.trim(),
        donorAge: (values.donor.donorAge),
        donorGender: values.donor.donorGender ?? donorBesicInfo.donorGender ?? "",
        donorWeight: values.donor.donorWeight,
        donorBloodGroup: values.donor.donorBloodGroup,
        donorContactNumber: values.donor.donorContactNumber,
        donorEmailId: values.donor.donorEmailId,
        donorAddress: values.donor.donorAddress,
        password: values.donor.password,
      },
      bloodBankId: Number(values.bloodBankId),
      unites: Number(values.unites),
    };

    try {
      const res = await fetch(`${API_BASE}/donateReq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      const created = await res.json();
      onSaved && onSaved(created);
      toast.success("Request Created Successfully");
      reset();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to create request. Check console.");
      toast.error("Failed to Create Request");
    } finally {
      setSaving(false);
    }
  };

  // ------------------- UI -------------------
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Donor Name */}
      <div>
        <label className="block text-sm">Donor Name</label>
        <input
          {...register("donor.donorName")}
          disabled={isFieldDisabled("donorName")}
          className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorName") ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        />
        <p className="text-red-600 text-sm">{errors.donor?.donorName?.message}</p>
      </div>

      {/* Age */}
        <div>
        <label className="block text-sm">Age</label>
        <input
            {...register("donor.donorAge")}
            disabled={isFieldDisabled("donorAge")}
            type="text"
            className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorAge") ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
        />
        <p className="text-red-600 text-sm">{errors.donor?.donorAge?.message}</p>
        </div>

      {/* Gender */}
      <div>
        <label className="block text-sm">Gender</label>
        <select
          {...register("donor.donorGender")}
          disabled={isFieldDisabled("donorGender")}
          className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorGender") ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        >
          <option value="">-- Select --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <p className="text-red-600 text-sm">{errors.donor?.donorGender?.message}</p>
      </div>



      {/* Weight */}
      <div>
        <label className="block text-sm">Weight</label>
        <input
          {...register("donor.donorWeight")}
          disabled={isFieldDisabled("donorWeight")}
          className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorWeight") ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        />
        <p className="text-red-600 text-sm">{errors.donor?.donorWeight?.message}</p>
      </div>

      {/* Blood Group */}
      <div>
        <label className="block text-sm">Blood Group</label>
        <select
          {...register("donor.donorBloodGroup")}
          disabled={isFieldDisabled("donorBloodGroup")}
          className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorBloodGroup")
              ? "bg-gray-200 cursor-not-allowed"
              : ""
          }`}
        >
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
        <p className="text-red-600 text-sm">
          {errors.donor?.donorBloodGroup?.message}
        </p>
      </div>

      {/* Address → textarea */}
      <div className="md:col-span-1">
        <label className="block text-sm">Address</label>
        <textarea
          {...register("donor.donorAddress")}
          disabled={isFieldDisabled("donorAddress")}
          rows={3}
          className={`w-full border rounded px-2 py-1 resize-none ${
            isFieldDisabled("donorAddress")
              ? "bg-gray-200 cursor-not-allowed"
              : ""
          }`}
          placeholder="Enter full address"
        ></textarea>
        <p className="text-red-600 text-sm">
          {errors.donor?.donorAddress?.message}
        </p>
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm">Contact Number</label>
        <input
          {...register("donor.donorContactNumber")}
          disabled={isFieldDisabled("donorContactNumber")}
          className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorContactNumber")
              ? "bg-gray-200 cursor-not-allowed"
              : ""
          }`}
        />
        <p className="text-red-600 text-sm">
          {errors.donor?.donorContactNumber?.message}
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm">Email</label>
        <input
          {...register("donor.donorEmailId")}
          disabled={isFieldDisabled("donorEmailId")}
          className={`w-full border rounded px-2 py-1 ${
            isFieldDisabled("donorEmailId")
              ? "bg-gray-200 cursor-not-allowed"
              : ""
          }`}
        />
        <p className="text-red-600 text-sm">
          {errors.donor?.donorEmailId?.message}
        </p>
      </div>

      {/* Blood Bank Dropdown */}
      <div>
        <label className="block text-sm">Blood Bank</label>
        <select
          {...register("bloodBankId")}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">-- Select --</option>
          {bloodBanks.map((b) => (
            <option key={b.bloodBankId} value={b.bloodBankId}>
              {b.bloodBankName}
            </option>
          ))}
        </select>
        <p className="text-red-600 text-sm">{errors.bloodBankId?.message}</p>
      </div>

      {/* Units */}
      <div>
        <label className="block text-sm">Units</label>
        <input
          {...register("unites")}
          type="number"
          min={1}
          className="w-full border rounded px-2 py-1"
        />
        <p className="text-red-600 text-sm">{errors.unites?.message}</p>
      </div>

      {/* Buttons */}
      <div className="md:col-span-3 flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          //onClick={handleSubmit(onSubmit)}
        >
          {saving ? "Creating..." : "Create Request"}
        </button>
      </div>

      {errorMsg && (
        <div className="md:col-span-3 text-red-600 mt-2">{errorMsg}</div>
      )}
    </form>
  );
}
