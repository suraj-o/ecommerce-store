import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import React from "react"
  

interface DropdownProps{
    children:React.ReactNode,
    title:string,
    menu:{
      title:string,
      setvalue:(value:string)=>void
    }[]
}
  
  const Dropdown:React.FC<DropdownProps> = ({children,menu,title}) => {
    return (
    <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              menu?.length>0?menu.map((menu,idx)=>(
                <DropdownMenuItem key={idx} onClick={()=>menu.setvalue(menu.title)} textValue="low">{menu.title}</DropdownMenuItem>
              )):null
            }
        </DropdownMenuContent>
    </DropdownMenu>
)}
  
  export default Dropdown




  