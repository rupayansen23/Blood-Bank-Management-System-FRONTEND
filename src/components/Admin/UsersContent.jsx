import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function UsersContent() {

    const [users, setUsers] = useState([]) 
    useEffect(()=>{
        fetch(`${API_BASE}/getAllDonors`)
        .then((response) => response.json())
        .then((data)=> setUsers(data))
        .catch((error) => console.error("Error in fetching Users details", error));
    },[])

    console.log(users);

    return(
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-[12%] bg-green-200 flex-shrink-0">
                <div className="p-5">
                    <p className="ml-2 text-2xl font-bold text-black">Users</p>
                </div>
            </div>
            <div className="w-full flex-1 overflow-y-auto">
                <div className="m-5 p-2 text-2xl">
                    <p>Users List</p> 
                </div>
                <div className="ml-5 mt-2 p-2 h-full">
                    <div className="relative w-full h-full overflow-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-blue-500 text-white sticky top-0">
                            <tr>
                                <td className="px-4 py-2 border">Id</td>
                                <td className="px-4 py-2 border">Name</td>
                                <td className="px-4 py-2 border">Age</td>
                                <td className="px-4 py-2 border">Gender</td>
                                <td className="px-4 py-2 border">Weight</td>
                                <td className="px-4 py-2 border">Address</td>
                                <td className="px-4 py-2 border">Blood Group</td>
                                <td className="px-4 py-2 border">Mobile</td>
                                <td className="px-4 py-2 border">Email</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user)=>(
                                    <tr key={user.donorId} className="text-center hover:bg-blue-50 transition">
                                        <td className="px-4 py-2 border">{user.donorId}</td>
                                        <td className="px-4 py-2 border">{user.donorName}</td>
                                        <td className="px-4 py-2 border">{user.donorAge}</td>
                                        <td className="px-4 py-2 border">{user.donorGender}</td>
                                        <td className="px-4 py-2 border">{user.donorWeight}</td>
                                        <td className="px-4 py-2 border">{user.donorAddress}</td>
                                        <td className="px-4 py-2 border">{user.donorBloodGroup}</td>
                                        <td className="px-4 py-2 border">{user.donorContactNumber}</td>    
                                        <td className="px-4 py-2 border">{user.donorEmailId}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}