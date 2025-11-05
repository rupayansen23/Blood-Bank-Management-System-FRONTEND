import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/SIgnup'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Guidelines from './pages/Guidelines';
import Contact from './pages/Contactus'
import AdminDashboard from './pages/Dashboard'
import { Provider } from 'react-redux'
import { store } from './Store/Store'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}> 
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/guidelines" element={<Guidelines></Guidelines>}></Route>
        <Route path="/contactus" element={<Contact></Contact>}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path=""></Route>
      </Routes>
    </Provider>
  )
}

export default App;
