import { Button } from '@/components/ui/button';
import { cleanCart } from '@/redux/reducer/addtoCart';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const SuccessPage = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mx-auto text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-green-800 mb-2">Success!</h1>
        <p className="text-gray-600">
          Your action was completed successfully.
        </p>
          <Button className='mt-2' onClick={()=>{dispatch(cleanCart()),navigate("/shopping")}}>
            GO TO SHOPPING
          </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
