import UserDonateRequests from "../../components/BloodBank/UserDonateRequests"
export default function DonateRequests() {
    return(
        <div className="w-full h-screen">
            <div className="w-full h-[12%] bg-green-200">
                <div className="p-5">
                    <p className="ml-2 text-2xl font-bold text-black">User Donate Requests</p>
                </div>
            </div>
            <div className="flex">
                <UserDonateRequests></UserDonateRequests>
            </div>
        </div>
    )
}