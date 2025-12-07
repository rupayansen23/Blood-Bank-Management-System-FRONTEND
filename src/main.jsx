import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ToastContainer position='bottom-right' autoClose={3000}/>
      <App></App>
    </BrowserRouter>
  
)
