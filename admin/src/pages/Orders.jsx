import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from "../assets/assets"


const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      // console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
        // reverse ini untuk data yang terbaru berada diatas
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // untuk option status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3 className="">Order Page</h3>
      <div className="">
        {
          orders.map((order, index) => (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div className="">
                <div className="">
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>
                      }
                    })
                  }
                </div>
                <p className="mt-3 mb-2 font-medium">{order.address.fullName}</p>
                <div className="">
                  <p className="">{order.address.street + ", "}</p>
                  <p className="">{order.address.regency + ", " + order.address.city + ", " + order.address.Province + ", " + order.address.zipCode}</p>
                </div>
                <p className="">{order.address.phone}</p>
              </div>
              <div className="border-l border-black pl-2">
                <p className="text-sm sm:text-[15px] font-medium">Items : {order.items.length}</p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p className="">Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p className="">Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} name="" id="" className="p-2 font-semibold border border-gray-200 outline-gray-200">
                <option className='' value='Order Placed'>Order Placed</option>
                <option className='' value='Packing'>Packing</option>
                <option className='' value='Shipped'>Shipped</option>
                <option className='' value='Out for delivery'>Out for delivery</option>
                <option className='' value='Delivered'>Delivered</option></select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
