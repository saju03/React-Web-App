import React, { useEffect, useState } from 'react'
import './list.css'
import { useNavigate } from 'react-router'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';

const Base_url="http://localhost:4000/"
function List({props}) {
const navigate = useNavigate()

const [update , setUpdate] = useState('')
    const editUser = ()=>{
        
        navigate('/admin/editUser',{state:props})
      
    }

    const deleteUser = async(e)=>{
       e.preventDefault();
      try {
          
      const data = axios.post('http://localhost:4000/admin/delete-user',{id:props._id})
      if(data){
        if(data.status){

        }
      }
      } catch (error) {
        
      }
   
    }


  return (

            <div className='list'>
            <img src={Base_url+props.profileImg} alt="img" className='profileImg' />
            <label className='name_feild'>{props.name} </label>
            <label className='email_feild'>{props.email}</label>
            <button className='editBtn' onClick={editUser}>edit</button>
            


            <Popup trigger={<button className='delBtn' >delete</button>  } position="right center">
    
    
    <div>Do you want to Delete User: {props.name}</div>
    <button onClick={deleteUser}>confirm</button>
   
  </Popup>
       
            </div>


  )
}

export default List