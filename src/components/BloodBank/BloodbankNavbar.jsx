export default function BloodbankNavbar({bloodBankInfo}) {
    return(
        <div className="flex justify-between bg-gradient-to-r from-red-900 via-red-700 to-red-500 shadow-md text-white top-">
            <div className="ml-5 p-5"><h1 className="font-bold text-2xl text-white">Blood Bank Dashbord</h1></div>
            <div>
                <h2 className="mr-4 p-5 font-bold">Hii {bloodBankInfo.bloodBankName}</h2>
            </div>
        </div>
    )
}