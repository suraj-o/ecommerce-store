import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protectedroute:React.FC<{children:ReactNode,isLogin:boolean}> = ({children,isLogin}) => {
    const navigate = useNavigate();
    const page = window.location.pathname.split("/").pop()

    useEffect(() => {
        if(!isLogin && (page === "login")){
            navigate("/login")
        }
        if(!isLogin && (page === "signup")){
            navigate("/signup")
        }
        
        if(!isLogin && ((page !== "login") && (page !== "signup") )){
            navigate("/login")
        }
    }, [])
    
  return children
}

export default Protectedroute