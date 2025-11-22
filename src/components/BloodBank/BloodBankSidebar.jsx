import { Link } from "react-router"
export default function BloodBankSidebar() {
    return(
        <>
            <div className="w-[20%] h-screen bg-pink-100">
            <div className="">
                <div className="p-5 bg-pink-400 font-bold text-black text-2xl text-center">
                    <h2>Nevigation</h2>
                </div>
                <div className="m-8 font-bold">
                    <ul className="">
                        <div className="mb-4">
                            <Link to="bloodbankinfo">
                                <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                    <span>Your Information</span>
                                </li>
                            </Link>
                        </div>
                        <div className="mb-4">
                            <Link to="bloodrequest">
                                <li className="flex cursor-pointer items-center justify-center gap-3 bg-pink-200 hover:bg-pink-300 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                                    <span>Requests</span>
                                </li>
                            </Link>                        
                        </div>
                        <div className="mb-4">

                        </div>
                        <div className="mb-4">
                            
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}