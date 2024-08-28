import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Foooter from './components/Foooter'
import Loader from './components/helpers/Loder'
import Navbar from './components/Nav'
import ProtectedRoute from './components/Protected-route'
import { useSelector } from 'react-redux'
import { UserReducerSate } from './types/redux'
import { Toaster } from './components/ui/toaster'

const HomePage = lazy(()=>import("./pages/Home"))
const ShoppingPage = lazy(()=>import("./pages/Shop"))
const SearchPage = lazy(()=>import("./pages/Search"))
const ProfilePage = lazy(()=>import("./pages/Profile"))
const MyorderPage = lazy(()=>import("./pages/Myorder"))
const LoginPage = lazy(()=>import("./pages/auth/SignIn"))
const Signup = lazy(()=>import("./pages/auth/SignUp"))
const NotFoundPage = lazy(()=>import("./pages/Not-found"))
const PlaceOrder= lazy(()=>import('./pages/Order'))
const Success= lazy(()=>import('./pages/Suceess'))



const App = () => {

  const {isLogin}= useSelector((state:{userReducer:UserReducerSate})=>state.userReducer)

  return (
    <Router>
      <Suspense fallback={<Loader/>}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>

        <Route path='/shopping' element={<ProtectedRoute isLogin={isLogin}> <ShoppingPage/> </ProtectedRoute>  }/>
        <Route path='/search' element={<ProtectedRoute isLogin={isLogin}> <SearchPage/> </ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute isLogin={isLogin}> <ProfilePage/> </ProtectedRoute> }/>
        <Route path='/orders' element={<ProtectedRoute isLogin={isLogin}> <MyorderPage/> </ProtectedRoute>  }/>
        <Route path='/place' element={<ProtectedRoute isLogin={isLogin}> <PlaceOrder/> </ProtectedRoute>  }/>
        <Route path='/success' element={<ProtectedRoute isLogin={isLogin}> <Success/> </ProtectedRoute>  }/>


        <Route path='/signup' element={<ProtectedRoute isLogin={isLogin}> <Signup/> </ProtectedRoute> }/>
        <Route path='/login' element={<ProtectedRoute isLogin={isLogin}> <LoginPage/> </ProtectedRoute>}/>

        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      <Foooter/>
      <Toaster/>
    </Suspense>
    </Router>
  )
}

export default App