import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useCookies } from 'react-cookie';
function AdminLogin() {
  const navigate = useNavigate()
  const [values,setValues ] = useState({
    email:'',
    password:'',
});

const [cookies,setCookies,removeCookie]= useCookies([])
useEffect(()=>{
  const verifyUser = async()=>{

 
   if(cookies.adminjwt){
     navigate('/admin')
     const {data} = await axios.post('http://localhost:4000/admin',{},{withCredentials:true})
     
        if(!data.status){
        removeCookie('adminjwt')
        navigate('admin/login') 
   }

   }
  
  }
  verifyUser();
},[])


const handelSubmit = async (e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/admin/login',{
        ...values
      })

      if (data) {
        
      console.log(data);
        if (data.errors) {
       
          const { email, password } = data.errors;
         
           if (password) {generateError(password)}
          else if (email){generateError(email)}
          
        
        }
        else {
       
          navigate('/admin')
          document.cookie=`adminjwt=${data.adminjwt}`
          
          }
      }
    } catch (error) {
      console.log(error);
    } 
}
  return (
    <div className='container'>
        <h2>Admin</h2>
        <form  onSubmit={(e)=>{handelSubmit(e)}}>
            <div>
                <label htmlFor="email">email</label>
                <input type="email" name='email' placeholder='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <button type='submit'>Submit</button>
          
        </form>
    </div>
  )
}

export default AdminLogin