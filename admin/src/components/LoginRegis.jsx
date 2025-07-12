import { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const LoginRegis = ({ setToken }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password, })
      if (response.data.success) {
        setToken(response.data.token)
        toast.success("Berhasil login")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error("Akun tidak ditemukan!!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <form action="" className="" onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Mail Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="rounded-md w-full px-3 py-2 bg-gray-100 border-gray-300 outline-none" type="email" name="" id="" placeholder="your@gmail.com" required />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-md w-full px-3 py-2 bg-gray-100 border-gray-300 outline-none" type="password" name="" id="" placeholder="Enter Pass" required />
          </div>
          <button className="w-full mt-2 py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-all duration-500" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginRegis
