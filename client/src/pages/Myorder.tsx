// src/MyOrdersPage.js

import { Button } from "@/components/ui/button";
import { InitialStateType, quantityUpdate, removeCart } from "@/redux/reducer/addtoCart";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const MyOrdersPage = () => {
  const orders = [
    { id: 1, date: '2024-08-20', total: '$45.99', status: 'Delivered' },
    { id: 2, date: '2024-08-15', total: '$89.99', status: 'Shipped' },
    { id: 3, date: '2024-08-10', total: '$29.99', status: 'Processing' },
  ];

  const dispatch = useDispatch()
  const {products,count}= useSelector((state:{cartReducer:InitialStateType})=>state.cartReducer)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
         <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Carts ({count})</h1>
        { products.length > 1 && (
          <Link to={"/place"}>
            <Button className="mb-6 px-2 bg-blue-600 text-white text-lg font-semibold border-blue-500 rounded-md flex items-center">Place Order</Button>
          </Link>
        )}
        </div>
        <div className="space-y-4">
          {products.length>1 && products.map((order) => order.price===0?null:(
            <div key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col space-y-6 md:flex-row items-center justify-between">
             <div>
             <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">Product #{order._id}</p>
                {/* <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Shipped' ? 'text-blue-500' : 'text-yellow-500'}`}>{order.status}</p> */}
              </div>  

              <div className='flex items-center gap-3'>
              {/* profileData.photo?`${import.meta.env.VITE_SERVER_URL}/${profileData.photo}` */}
                <img src={order.photo?order.photo:"https://via.placeholder.com/150"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-blue-600"/>
                <span>
                    <p className="text-gray-600 capitalize font-semibold">Name: {order.name}</p>
                    <p className="text-gray-700 mt-1 capitalize font-semibold">Price: ₹{order.price * order.quantity}/-</p>
                    <p className="text-gray-700 mt-1 capitalize font-semibold">Category: {order.category} Product</p>
                    <p className="text-gray-700 mt-1 capitalize font-semibold">Quanitiy: {order.quantity} Piece</p>
                </span>
              </div>       

             </div>

              <div className="flex flex-col gap-3 items-center">
                <Button onClick={()=>dispatch(removeCart(order._id))} className="px-2 bg-red-600 text-white text-lg font-bold border-red-500 rounded-md flex items-center"> <MdDelete className="text-white text-xl"/> Remove</Button>
                <div className="flex items-center gap-3">
                 <Button disabled={order.quantity==0?true:false}  onClick={()=>dispatch(quantityUpdate({_id:order._id,method:"dec"}))} className="p-3 text-3xl" > - </Button>
                  <span className="text-xl font-mono"> {order.quantity} </span>
                 <Button disabled={order.quantity===order.stock?true:false} onClick={()=>dispatch(quantityUpdate({_id:order._id,method:"inc"}))} className="p-3 text-2xl"> + </Button>
                </div>
                 {order.quantity===order.stock && <span className="text-md font-mono"> OUT OF STOCK </span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
