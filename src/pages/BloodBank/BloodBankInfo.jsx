import BloodBankInformations from "../../components/BloodBank/BloodBankInformations";

export default function BloodBankInfo() {
    return(
        <div className="w-full h-screen">
            <div className="w-full h-[12%] bg-green-200">
                <div className="p-5">
                    <p className="ml-2 text-2xl font-bold text-black">Your Information</p>
                </div>
            </div>
            <div className="flex">
                <BloodBankInformations></BloodBankInformations>
            </div>
        </div>
    )
}