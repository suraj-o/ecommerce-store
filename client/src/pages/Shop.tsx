// src/ShoppingPage.js

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useGetLatestProductQuery } from "@/redux/api/products";
import { addCart, PayloadActionType } from "@/redux/reducer/addtoCart";
import { useCallback } from "react";
import { useDispatch } from "react-redux";


const ShoppingPage = () => {

  const {data}= useGetLatestProductQuery(null)
  const dispatch=useDispatch()

  const addtoCartHandler = useCallback(({_id,name,photo,category,price,quantity,stock}:PayloadActionType)=>{
    dispatch(addCart({_id,name,price,category,quantity,photo,stock}));
    toast({
      title:"Added to cart",
      description:"Go to cart section to cheack your cart items"
    })
  },[])

  return (
    <div className="container mx-auto px-4 py-8 relative">
        <h1 className='text-3xl pb-2 font-mono'>Latest Products </h1>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[70vh] max-h-[70vh] overflow-y-auto">
        {data?.products.map(product => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-4">₹{product.price.toFixed(2)}</p>
            <Button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg text-center inline-block"
              onClick={()=>addtoCartHandler({
                _id:product._id,
                name:product.name,
                photo:product.photo,
                price:product.price,
                quantity:1,
                category:product.category,
                stock:product.stock
              })}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingPage;
