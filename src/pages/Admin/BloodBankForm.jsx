import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ...existing code...
const schema = z
  .object({
    bloodBankName: z.string().min(1, "Blood Bank Name is required."),
    bloodBankAddress: z.string().optional().nullable(),
    bloodBankContactNumber: z.string().min(1, "Contact Number is required."),
    adminID: z.string().min(1, "User ID is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Please confirm password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export default function BloodBankForm({ onSaved, onCancel }) {
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bloodBankName: "",
      bloodBankAddress: "",
      bloodBankContactNumber: "",
      adminID: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setServerError("");
    setSaving(true);
    console.log(values);
    try {
      const payload = {
        bloodBankName: values.bloodBankName.trim(),
        bloodBankAddress: values.bloodBankAddress?.trim() ?? "",
        bloodBankContactNumber: values.bloodBankContactNumber.trim(),
        adminID: values.adminID.trim(),
        password: values.password,
      };

      const res = await fetch(`${API_BASE}/saveBloodBank`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        body = raw;
      }

      if (!res.ok) {
        throw new Error((body && (body.message || body.error)) || `Failed (${res.status})`);
      }

      const created =
        body && typeof body === "object"
          ? body
          : {
              //bloodBankId: Date.now(),
              bloodBankName: payload.bloodBankName,
              bloodBankAddress: payload.bloodBankAddress,
              bloodBankContactNumber: payload.bloodBankContactNumber,
              adminID: payload.adminID,
            };
      toast.success("Blood Bank Registered Successfully!");
      onSaved && onSaved(created);
      reset();
    } catch (err) {
      console.error("Save error", err);
      setServerError(err?.message || "Save failed");
      toast.error(err?.message || "Something went wrong while saving!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Blood Bank Name</label>
          <input
            {...register("bloodBankName")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm ${
              errors.bloodBankName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter blood bank name"
          />
          {errors.bloodBankName && <p className="text-red-600 text-sm mt-1">{errors.bloodBankName.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register("bloodBankAddress")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm ${errors.bloodBankAddress ? "border-red-500" : "border-gray-300"}`}
            placeholder="Full address"
          />
          {errors.bloodBankAddress && <p className="text-red-600 text-sm mt-1">{errors.bloodBankAddress.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            {...register("bloodBankContactNumber")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm ${errors.bloodBankContactNumber ? "border-red-500" : "border-gray-300"}`}
            placeholder="Phone number"
          />
          {errors.bloodBankContactNumber && <p className="text-red-600 text-sm mt-1">{errors.bloodBankContactNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            {...register("adminID")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm ${errors.adminID ? "border-red-500" : "border-gray-300"}`}
            placeholder="Login user id for bank"
          />
          {errors.adminID && <p className="text-red-600 text-sm mt-1">{errors.adminID.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm ${errors.password ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter password (min 6 chars)"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {serverError && <div className="mt-4 text-sm text-red-600">{serverError}</div>}

      <div className="mt-6 flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
          disabled={saving || isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-red-700 text-white hover:bg-red-800 disabled:opacity-60"
          disabled={saving || isSubmitting}
        >
          {saving || isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}