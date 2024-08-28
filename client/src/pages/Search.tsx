// src/SearchPage.js

import Dropdown from '@/components/helpers/Dropdown';
import Loader from '@/components/helpers/Loder';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useGetProductCategoryQuery } from '@/redux/api/products';
import { addCart, PayloadActionType } from '@/redux/reducer/addtoCart';
import { CategoryResponse, SearchResponse } from '@/types/redux';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('price-asc');
  const [category, setCategory] = useState<string>('');
  const [pages,setpages]=useState<Array<any>>([]) 
  const [page,setpage]=useState<number>(1) 
  const [loading,setIsloading]=useState<boolean>(true)
  const [searchData,setSearchData]=useState<SearchResponse>({
    filteredProduct:[],
    success:false,
    totalPages:0
  })

  const {data}= useGetProductCategoryQuery("") as {data:CategoryResponse}


  
  
  useEffect(()=>{
    
    let base = `${import.meta.env.VITE_SERVER_URL}/api/v1/product/all/products?search=${search}`;
    
    if(category) base+=`&category=${category}`;
    if(sort) base+=`&sort=${sort==="price-asc"?"asc":"dsc"}`;
    if(page) base+=`&page=${page}`;
    
    
        let apiCallingId=setTimeout(async()=>{
          try {
            const {data}= await axios.get(base) as {data:SearchResponse}
            
            setSearchData(data)
            setpages(()=>new Array(data.totalPages))
            
            setIsloading(false)
          } catch (error) {
            setIsloading(false)
            console.log(error)
          }
        },1500)



    return ()=>{
      clearTimeout(apiCallingId)
      setIsloading(true)
      setSearchData({   
        filteredProduct:[],
        success:false,
        totalPages:0
      })
      setpages([])
    }
  },[search,sort,category])

  const dispatch=useDispatch()

  const addtoCartHandler = useCallback(({_id,name,photo,category,price,quantity,stock}:PayloadActionType)=>{
    dispatch(addCart({_id,name,price,category,quantity,photo,stock}));
    toast({
      title:"Added to cart",
      description:"Go to cart section to cheack your cart items"
    })
  },[])



    const sortValues=[
      {
        title:"price-asc",
        setvalue:setSort
      },
      {
        title:"price-dsc",
        setvalue:setSort
      }
    ]

    const categoriesValue= data===undefined?null:data.categories.map((value)=>({
      title:value,
      setvalue:setCategory
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Search Input */}
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent border-none focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="mt-4 md:mt-0 md:ml-4">
        <Dropdown title='Choose Category' menu={categoriesValue!}>
          <Button variant={"ghost"} className="flex items-center bg-gray-200 p-2 border border-gray-300 rounded-md">
            <FaFilter className="text-gray-500 mr-2" />
            <span>{category}</span>
          </Button>
          </Dropdown>
        </div>


        {/* Sort Dropdown */}
        <div className='ml-2'>
        <Dropdown title='Choose Price Order' menu={sortValues}>
             <Button variant={"ghost"} className=' bg-gray-200 p-2 border border-gray-300 rounded-md'>
                 {sort}
            </Button>
        </Dropdown>
        </div>

      </div>

      {/* Product Grid */}
      <div className="min-h-[70vh] max-h-[70vh] overflow-y-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
        {searchData.filteredProduct.length > 0 ? (
          searchData.filteredProduct.map(product => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md ">
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
          ))
        ) : (
          <div>
            {loading?(
              <div className='relative top-[-10%] md:left-[160%]'>
                <Loader/>
              </div>
              ):<p className="text-center text-gray-500 text-3xl font-bold capitalize">No products found</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
