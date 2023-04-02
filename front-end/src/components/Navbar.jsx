import React, { useEffect } from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router'
import axios from 'axios'
import {useCookies} from 'react-cookie'

function Navbar() {

  useEffect(()=>{
    const verifyUser = async()=>{
     if(!cookies.jwt){
       navigate('/login')
     }else{
       const {data} = await axios.post('http://localhost:4000',{},{withCredentials:true})
     if(!data.status){
       removeCookie('jwt')
       navigate('/login')
     }else{
       console.log(data);
     }
 
     }
    }
    verifyUser();
 })
 



  const [cookies,setCookies,removeCookie]= useCookies([])
  const navigate = useNavigate();
  const logout = ()=>{
    
    navigate('/login')
    removeCookie('jwt')
  }
  return (
    <div className='headder'>
        <h3>hello </h3>
        <button className='logoutButton' onClick={logout}>logout</button>
    </div>
  )
}

export default Navbar