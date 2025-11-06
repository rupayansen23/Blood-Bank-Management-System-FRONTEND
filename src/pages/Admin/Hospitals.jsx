import Hospital from "../../components/Admin/Hospital"


export default function Hospitals() {
    return(
        <div className="bg-white">
                <div><AdminNavbar></AdminNavbar></div>
                <div className="flex">
                  <Sidebar></Sidebar>
                  <Hospital></Hospital>
                </div>
              </div>
    )
}