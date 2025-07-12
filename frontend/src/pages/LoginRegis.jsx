import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginRegis = () => {

  const [currentState, setCurrentState] = useState('Sign In');
  // panggil data user dari backend
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  // untuk click btn
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // API
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        // console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {
        // untuk login
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        // console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} action="" className="flex  flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Sign In' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="" id="" className="w-full px-3 py-2 border border-e-gray-800" placeholder="Name" required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="" id="" className="w-full px-3 py-2 border border-e-gray-800" placeholder="Mail" required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="" id="" className="w-full px-3 py-2 border border-e-gray-800" placeholder="Password" required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:underline">Forget your password?</p>
        {
          currentState == 'Sign In'
            ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:underline">Create account</p> : <p onClick={() => setCurrentState('Sign In')} className="cursor-pointer hover:underline">Sign In</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 w-full">{currentState == 'Sign In' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default LoginRegis
