
import { toast } from '@/components/ui/use-toast';
import { isUserLogin } from '@/redux/reducer/user';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Page(){
   const [email,setEmail]=useState<string>("");
   const [password,setPassword]=useState<string>("");
   const dispatch = useDispatch()
   const navigator=useNavigate()


   const onFormSubmitHandler=async(e: React.FormEvent<HTMLFormElement>):Promise<void>=>{
    e.preventDefault();
    try {
      console.log(import.meta.env.VITE_SERVER_URL)
      const {data}= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/sign-in`,
        { email,password },{ withCredentials:true })

        console.log(data)

        if(data.success){
          toast({
            title:data.message,
            variant:"default"
          })
          navigator("/shopping")
          dispatch(isUserLogin(data.user!))
        }

    } catch (error) {
      toast({
        title:"something wrong",
        description:"check your email and password properly ",
        variant:"destructive"
      })
    }
   }

  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-[-80px]">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e)=>onFormSubmitHandler(e)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

