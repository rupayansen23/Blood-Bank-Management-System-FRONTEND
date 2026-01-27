import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useState, useEffect } from "react";


const API_BASE = import.meta.env.VITE_API_BASE_URL;

const bloodRequestSchema = z.object({
    bloodGroup: z.enum(["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"], {
        errorMap: () => ({ message: "Select a valid blood group" }),
    }),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1").max(100, "Quantity cannot exceed 100"),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "EMERGENCY"], {
        errorMap: () => ({ message: "Select a priority level" }),
    }),
    requestTo: z.string().nonempty("Please select a blood bank")
});

export default function BloodRequestForm({ onClose, onSuccess }) {
    const ctx = useOutletContext();
    const [bloodBanks, setBloodBanks] = useState([]);
    const hospitalInfo = (ctx && (ctx.hospitalInfo ?? ctx)) || {};
    const hospitalId = hospitalInfo.hospitalId;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(bloodRequestSchema),
    });
    
    useEffect(() => {
        const fetchBloodBanks = async () => {
            try {
                const res = await fetch(`${API_BASE}/getAllBloodBanks`);
                console.log(res);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
    
                const data = await res.json();
    
                if (Array.isArray(data)) {
                    setBloodBanks(data);
                } else {
                    console.error("Unexpected response format:", data);
                    setBloodBanks([]);
                }
            } catch (error) {
                console.error("Error fetching blood banks:", error);
                toast.error("Failed to load blood banks");
            }
        };
    
        fetchBloodBanks();
    }, []);

    const onSubmit = async (data) => {
        try {
            const requestData = {
                requesterId: hospitalId,
                bloodGroup: data.bloodGroup,
                quantity: data.quantity,
                priority: data.priority,
                requestTo: data.requestTo,
            };

            const res = await fetch(`${API_BASE}/bloodRequest`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                const msg = await res.text();
                console.log(msg);
                throw new Error(msg || "Request creation failed");
            } else {
                const responseData = await res.json();
                console.log(responseData);
                toast.success("Blood request created successfully!");
                reset();
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Failed to create blood request");
        }
    };

    const bloodGroups = [
        { label: "A+", value: "A_POS" },
        { label: "A-", value: "A_NEG" },
        { label: "B+", value: "B_POS" },
        { label: "B-", value: "B_NEG" },
        { label: "AB+", value: "AB_POS" },
        { label: "AB-", value: "AB_NEG" },
        { label: "O+", value: "O_POS" },
        { label: "O-", value: "O_NEG" },
    ];

    const priorities = ["LOW", "NORMAL", "HIGH", "EMERGENCY"];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Request Blood</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-red-700 p-1 rounded transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Blood Group */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text font-semibold text-gray-700">Blood Group</span>
                        </label>
                        <select
                            {...register("bloodGroup")}
                            className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none cursor-pointer font-medium ${
                                errors.bloodGroup
                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300"
                            }`}
                        >
                            <option value="">Select blood group</option>
                                {bloodGroups.map((group) => (
                                    <option key={group.value} value={group.value}>
                                        {group.label}
                                    </option>
                                ))}

                        </select>
                        {errors.bloodGroup && (
                            <span className="text-red-500 text-sm mt-2 font-medium">{errors.bloodGroup.message}</span>
                        )}
                    </div>

                    {/* Quantity */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text font-semibold text-gray-700">Quantity (Units)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter quantity"
                            className={`input w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                                errors.quantity
                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300"
                            }`}
                            {...register("quantity")}
                        />
                        {errors.quantity && (
                            <span className="text-red-500 text-sm mt-2 font-medium">{errors.quantity.message}</span>
                        )}
                    </div>

                    {/* Priority */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text font-semibold text-gray-700">Priority</span>
                        </label>
                        <select
                            {...register("priority")}
                            className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none cursor-pointer font-medium ${
                                errors.priority
                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300"
                            }`}
                        >
                            <option value="">Select priority</option>
                            {priorities.map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                        {errors.priority && (
                            <span className="text-red-500 text-sm mt-2 font-medium">{errors.priority.message}</span>
                        )}
                    </div>

                    {/* Request To */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text font-semibold text-gray-700">Request To (Blood Bank/Donor)</span>
                        </label>
                        <select
                            className={`select w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none ${
                                errors.requestTo
                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 hover:border-gray-300"
                            }`}
                            {...register("requestTo", { required: "Please select a blood bank" })}
                        >
                            <option value="">Select Blood Bank</option>

                            {bloodBanks.map((bb) => (
                                <option
                                    key={bb.bloodBankId}
                                    value={bb.bloodBankName}
                                >
                                    {bb.bloodBankName}
                                </option>
                            ))}
                        </select>

                        {errors.requestTo && (
                            <span className="text-red-500 text-sm mt-2 font-medium">{errors.requestTo.message}</span>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
