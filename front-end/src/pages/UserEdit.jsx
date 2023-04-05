import React, { useState } from 'react'
import AdminNav from '../components/adminNav/AdminNav'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'


function UserEdit() {
  const navigate = useNavigate()
    const location =useLocation()
    
   const userData = location.state

   const [name,setName] = useState(userData.name)
   const [email,setEmail] = useState(userData.email)

   const handelSubmit = (e)=>{
    e.preventDefault();



    try {
        const response = axios.post('http://localhost:4000/admin/edit-user',{name:name,email:email,id:userData._id},{withCredentials:true})

        if(response){
          if(response.status){
            navigate('/admin',{state:{status:true}})
          }else{
            navigate('/admin')
          }
        }else{
          navigate('/admin')
        }
    } catch (error) {
        
    }

   }
  return (
    <div>
        <AdminNav />
        <div className='container'>
       <form action=""> Edit User : {userData._id}
        <div>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div>
        <label htmlFor="name">Email</label>
        <input type="text" name='name' value={email} onChange={(e)=>{setEmail(e.target.value)} }/>
        </div>

      
      <button onClick={handelSubmit}>update</button>
         <button onClick={(e)=>{
          e.preventDefault();
           navigate('/admin')
         }}>cancel</button>
       
        

       </form>
       
       </div>
    </div>
  )
}

export default UserEdit