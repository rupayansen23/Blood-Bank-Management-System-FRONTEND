import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Zod validation schema
const hospitalSchema = z.object({
    hospitalName: z.string().min(3, "Hospital name must be at least 3 characters").max(100, "Hospital name is too long"),
    hospitalAddress: z.string().min(5, "Address must be at least 5 characters").max(200, "Address is too long"),
    hospitalContactNumber: z.string().regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),
    adminID: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long")
});

export default function Hospital() {

    const [hospitals, setHospitals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(hospitalSchema)
    });

    useEffect(()=>{
        fetchHospitals();
    }, [])

    const fetchHospitals = () => {
        fetch(`${API_BASE}/getAllHospitals`)
        .then((response) => response.json())
        .then((data) => setHospitals(data))
        .catch((error) => console.error("Error in fetching hospitals", error));
    }

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE}/saveHospital`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast.success("Hospital added successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                reset();
                setIsModalOpen(false);
                fetchHospitals(); // Refresh the hospital list
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to add hospital!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error("An error occurred while adding hospital!", {
                position: "top-right",
                autoClose: 3000,
            });
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }
    
    console.log(hospitals);

    return (
        <div className="w-[100%] h-screen ">
            <div className="w-full bg-green-200 h-[12%]">
                <div className="p-5 flex justify-between items-center">
                    <p className="ml-2 text-2xl font-bold">Hospital</p>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
                    >
                        + Add Hospital
                    </button>
                </div>
            </div>
            <div className=" w-full h-full ">
                <div className="m-5 p-2 text-2xl">
                    <p>Hospitals List</p> 
                </div>
                <div className="ml-5 mt-2 p-2">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <td className="px-4 py-2 border">Id</td>
                                <td className="px-4 py-2 border">Name</td>
                                <td className="px-4 py-2 border">Blood Group Type</td>
                                <td className="px-4 py-2 border">Blood Amount</td>
                                <td className="px-4 py-2 border">Address</td>
                                <td className="px-4 py-2 border">Contact Number</td>
                                <td className="px-4 py-2 border">Total Receipits</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hospitals.map((hospital)=>(
                                    <tr key={hospital.hospitalId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{hospital.hospitalId}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalName}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalBloodGroupType}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalBloodAmount}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalAddress}</td>
                                        <td className="px-4 py-2 border">{hospital.hospitalContactNumber}</td>
                                        <td className="px-4 py-2 border">{hospital.totalRecipients}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Adding Hospital */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Hospital</h2>
                            <button 
                                onClick={() => {
                                    setIsModalOpen(false);
                                    reset();
                                }}
                                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Hospital Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hospital Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("hospitalName")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter hospital name"
                                />
                                {errors.hospitalName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.hospitalName.message}</p>
                                )}
                            </div>

                            {/* Hospital Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hospital Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("hospitalAddress")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter hospital address"
                                />
                                {errors.hospitalAddress && (
                                    <p className="text-red-500 text-sm mt-1">{errors.hospitalAddress.message}</p>
                                )}
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("hospitalContactNumber")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter 10-digit contact number"
                                    maxLength="10"
                                />
                                {errors.hospitalContactNumber && (
                                    <p className="text-red-500 text-sm mt-1">{errors.hospitalContactNumber.message}</p>
                                )}
                            </div>

                            {/* Admin Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Admin Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("adminID")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter admin email"
                                />
                                {errors.adminID && (
                                    <p className="text-red-500 text-sm mt-1">{errors.adminID.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Adding..." : "Add Hospital"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        reset();
                                    }}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}