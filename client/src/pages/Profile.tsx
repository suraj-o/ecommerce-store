// src/ProfilePage.js

import { useGetMyprofileQuery } from "@/redux/api/user";
import { isUserData } from "@/redux/reducer/user";
import { UserProfileResponse, UserReducerSate } from "@/types/redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ProfilePage = () => {
  const orders = [
    { id: 1, date: '2024-08-20', total: '$45.99', status: 'Delivered' },
    { id: 2, date: '2024-08-15', total: '$89.99', status: 'Shipped' },
    { id: 3, date: '2024-08-10', total: '$29.99', status: 'Processing' },
  ];

  const addresses = [
    { id: 1, label: 'Home', address: '123 Main St, Apt 4B, New York, NY 10001' },
    { id: 2, label: 'Work', address: '456 Office Park, Suite 300, San Francisco, CA 94105' },
  ];

  const [profileData,setProfileData]=useState<UserProfileResponse["user"]>({
    name:"",
    email:"",
    photo:"",
    gender:""
  })
  const dispatch=useDispatch()

  const {user}= useSelector((state:{userReducer:UserReducerSate})=>state.userReducer)
  const {data}=useGetMyprofileQuery(user)

  console.log(data)

  useEffect(()=>{
    setProfileData( data===undefined?{
      name:"",
      email:"",
      photo:"",
      gender:""
    }:data!.user)
    dispatch(isUserData(data===undefined?{
      name:"",
      email:"",
      photo:"",
      gender:""
    }:data!.user))
    return()=>{
      setProfileData({
        name:"",
        email:"",
        photo:"",
        gender:""
      })
    }
  },[])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={profileData.photo?`${import.meta.env.VITE_SERVER_URL}/${profileData.photo}`:"https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-600"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
            <p className="text-gray-600 mt-1">{profileData.email}</p>
            {/* <p className="text-gray-600 mt-1">Joined on August 2024</p> */}
          </div>
        </div>

        {/* Account Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
          <div className="mt-4">
            <p className="text-gray-700"><span className="font-semibold">Full Name:</span> {profileData.name}</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {profileData.email}</p>
            <p className="text-gray-700"><span className="font-semibold">Phone:</span> (+91) XX-XXXX-XXXX</p>
          </div>
        </div>

        {/* Order History */}
        {/* <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">Order #{order.id}</p>
                  <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Shipped' ? 'text-blue-500' : 'text-yellow-500'}`}>{order.status}</p>
                </div>
                <p className="text-gray-600 mt-2">Date: {order.date}</p>
                <p className="text-gray-700 mt-1">Total: {order.total}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Address Book */}
        {/* <div>
          <h2 className="text-xl font-semibold text-gray-800">Address Book</h2>
          <div className="mt-4 space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800">{address.label}</p>
                <p className="text-gray-700 mt-1">{address.address}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
