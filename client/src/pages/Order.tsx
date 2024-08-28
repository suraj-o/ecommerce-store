// src/components/OrderDetails.js
import { options } from '@/components/helpers';
import OrderDetails from '@/components/Order';
import { InitialStateType } from '@/redux/reducer/addtoCart';
import { UserReducerSate } from '@/types/redux';
import axios from 'axios';
import { userInfo } from 'os';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


// src/components/PlaceOrder.js

const PlaceOrder = () => {

const [fullname,setFullname]=useState<string>("")
const [email,setEmail]=useState<string>("")
const [address,setAdress]=useState<string>("")
const [phone,setPhone]=useState<string>()

const {products,count}= useSelector((state:{cartReducer:InitialStateType})=>state.cartReducer)
const {user}= useSelector((state:{userReducer:UserReducerSate})=>state.userReducer)

// amount calculation
const [price,setPrice]=useState<number>(0)
const [shipping,setShipping]=useState<number>(0)
const [tax,setTax]=useState<number>(0)
const [total,setTotal]=useState<number>(0)


const amountCalculation = useCallback(()=>{
    // all product total price 
    let tempPrice:number=0;
    products.forEach((product,idx)=>{
        tempPrice+=product.price * product.quantity
    })
    setPrice(tempPrice)
    //setting shipping charges 40rs per order 
    let shipping=count*30
    setShipping(shipping)

    //setting 18% GST tax
    let tax = (18/100) * tempPrice
    setTax(tax)

    // setting total
    setTotal(tempPrice + (shipping + tax))
},[products,count])


useEffect(()=>{
    amountCalculation()
    return()=>{
        setPrice(0)
        setTax(0)
        setShipping(0)
        // setTotal(0)
    }
},[products,count])


  const handleSubmit = async(e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const body={
                user,
                userInfo:{
                    fullname,
                    address,
                    email,
                    phone
                },
                products,
                orders:count,
                amount:{
                subtotal:price,
                shipping,
                tax,
                total,
                }
        }
        const {data:{order}} =await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/genrate-order`,
                     body,{headers:{ "Content-Type":"application/json" }}
        )

        options.amount=order.amount
        options.order_id=order.id
        options.callback_url="http://localhost:9000/api/v1/payment-verification"
        options.key=import.meta.env.VITE_KEY_ID

        const rzp = new Razorpay(options)
        rzp.open()

    } catch (error) {
        console.log(error)
        
    }
  };








  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>
      <OrderDetails order={products} count={count} price={price} shipping={shipping} tax={tax} total={total} />
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id='name'
            // required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder='JHON SINGH'
            value={fullname}
            onChange={(e)=>setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="number"
            name="name"
            id='name'
            // required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder='+91-XXXX-XXXX-XX'
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            // required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            placeholder='JHONSINGH@GMAIL.COM'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            name="address"
            rows={3}
            // required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={address}
            onChange={(e)=>setAdress(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
