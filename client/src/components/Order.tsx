// src/components/OrderDetails.js
import { InitialStateType } from '@/redux/reducer/addtoCart';

interface OrderDetailsProp{
    order:InitialStateType["products"],
    count:number
    price:number
    shipping:number
    tax:number
    total:number
}

const OrderDetails = ({ order ,count,price,shipping,tax,total }:OrderDetailsProp) => {

    console.log({price,tax,total,shipping})
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 min-h-[25vh] max-h-[43vh] overflow-y-auto">
        <div className="mt-4 flex flex-col justify-between font-semibold">
          <div className='flex justify-between font-semibold' >
              <span>Price</span>
              <span>₹{price}/-</span>
          </div>
          <div className='flex justify-between font-semibold' >
              <span>Shipping</span>
              <span>₹{shipping}/-</span>
          </div>
          <div className='flex justify-between font-semibold' >
              <span>Tax</span>
              <span>₹{tax}/-</span>
          </div>
          <div className='flex justify-between font-semibold' >
              <span>Total</span>
              <span>₹{total}/-</span>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4 mt-6">Order Details {count}</h2>
  
        <ul className="space-y-4">
          {order.length > 1 && order.map((order ,index) => order.price === 0 ? null:(
            <li key={index} className="flex justify-between">
              <div className='flex items-center space-x-3'>
              <img src={order.photo?order.photo:"https://via.placeholder.com/150"} alt="Profile" className="w-12 h-12 rounded-full border-2 border-blue-600"/>
                  <span className="font-medium">{order.name}</span>
              </div>
              <span>{order.quantity} x ₹{order.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default OrderDetails
  