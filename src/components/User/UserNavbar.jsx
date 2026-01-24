export default function UserNavbar({donorBesicInfo}) {

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(donorBesicInfo?.donorName);

    return (
       <div className="flex justify-between items-center bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-md text-white">
            <div className="ml-5 p-5"><h1 className="font-bold text-2xl text-white">User Dashboard</h1></div>
            <div className="flex items-center gap-4 mr-5 pr-5">
                <div className="flex flex-col items-end">
                    <h2 className="font-bold">Hii {donorBesicInfo.donorName}</h2>
                    {donorBesicInfo?.donorBloodGroup && (
                        <p className="text-sm opacity-90">Blood Group: {donorBesicInfo.donorBloodGroup}</p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-red-700 text-lg">
                    {initials}
                </div>
            </div>
        </div>
    )
}