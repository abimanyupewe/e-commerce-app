import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PleceOrder = () => {
  const [method, setMethod] = useState('cod');
  // submit
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  // formdata Untuk DB
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    regency: '',
    city: '',
    Province: '',
    zipCode: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* bagian kiri */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <input required onChange={onChangeHandler} value={formData.fullName} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="fullName" id="" placeholder='Full name' />
        {/* <input className='border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="" id="" placeholder='Last name' /> */}
        <input required onChange={onChangeHandler} value={formData.email} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="email" name="email" id="" placeholder='Mail address' />
        <textarea required onChange={onChangeHandler} value={formData.street} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="street" id="" placeholder='Street' />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} value={formData.regency} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="regency" id="" placeholder='Regency' />
          <input required onChange={onChangeHandler} value={formData.city} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="city" id="" placeholder='City' />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} value={formData.Province} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="Province" id="" placeholder='Province' />
          <input required onChange={onChangeHandler} value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="number" name="zipCode" id="" placeholder='Zip code' />
        </div>
        <input required onChange={onChangeHandler} value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3 w-full' type="number" name="phone" id="" placeholder='Phone' />
      </div>

      {/* bagian kanan */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* payment method section */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DLEVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm w-full'>ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PleceOrder
