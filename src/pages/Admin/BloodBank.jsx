import BloodBankContent from "../../components/Admin/BloodBankContent"
import AdminNavbar from "../../components/Admin/AdminNavbar";
import Sidebar from "../../components/Admin/Sidebar";

export default function BloodBank() {
   console.log("hi");
    return(
        <div className="bg-white">
                <div><AdminNavbar></AdminNavbar></div>
                <div className="flex">
                  <Sidebar></Sidebar>
                  <BloodBankContent></BloodBankContent>
                </div>
          </div>
    )
}