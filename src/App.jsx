import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/Admin/Login'
import Signup from './pages/SIgnup'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Guidelines from './pages/Guidelines';
import Contact from './pages/Contactus'
import AdminDashboard from './pages/Admin/Dashboard'
import { Provider } from 'react-redux'
import { store } from './Store/Store'
import Hospitals from './pages/Admin/Hospitals'
import BloodBank from './pages/Admin/BloodBank'
import Users from './pages/Admin/Users'
import AdminHome from './components/Admin/AdminHome'
import UserDashboard from './pages/User/UserDashboard'
import UserInfo from './pages/User/UserInfo'
import UserLogin from './pages/UserLogin'
import HospitalDashboard from './pages/Hospital/HospitalDashboard'
import BloodBankDashbord from './pages/BloodBank/BloodBankDashbord'
import BloodBankInfo from './pages/BloodBank/BloodBankInfo'
import BloodRequests from './pages/BloodBank/BloodRequests'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}> 
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/adminlogin" element={<Login></Login>}></Route>
        <Route path='/login' element={<UserLogin></UserLogin>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/guidelines" element={<Guidelines></Guidelines>}></Route>
        <Route path="/contactus" element={<Contact></Contact>}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>}>
          {/* <Route index element={<AdminHome />} /> */}
          <Route path="hospitals" element={<Hospitals></Hospitals>}></Route>
          <Route path="bloodBank" element={<BloodBank></BloodBank>}></Route>
          <Route path="users" element={<Users></Users>}></Route>
          <Route path="home" element={<AdminHome></AdminHome>}></Route>
        </Route>
        <Route path="/user/dashboard" element={<UserDashboard></UserDashboard>}>
          <Route path="userInfo" element={<UserInfo></UserInfo>}></Route>
        </Route>
        <Route path="/hospital/dashbord" element={<HospitalDashboard></HospitalDashboard>}></Route>
        <Route path="/bloodbank/dashbord" element={<BloodBankDashbord></BloodBankDashbord>}>
          <Route path="bloodbankinfo" element={<BloodBankInfo></BloodBankInfo>}></Route>
          <Route path="bloodrequest" element={<BloodRequests></BloodRequests>}></Route>
        </Route>
      </Routes>
    </Provider>
  )
}

export default App;
