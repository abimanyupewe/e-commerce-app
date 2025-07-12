import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import LoginRegis from "./components/LoginRegis"
import { useEffect, useState } from "react"

// toastify
import { ToastContainer } from 'react-toastify';

// untuk memanggil API loginregis
export const backendUrl = import.meta.env.VITE_BACKEND_URL
// untuk price
export const currency = '$'

const App = () => {

  // untuk mengambil token login admin
  const [token, setToken] = useState(localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '');

  // agar jika relog tidak kembali ke halaman login
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {
        token === ""
          ? <LoginRegis setToken={setToken} />
          : <>
            <Navbar setToken={setToken}/>
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App
