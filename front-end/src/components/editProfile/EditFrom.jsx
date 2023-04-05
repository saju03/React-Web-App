import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useSelector } from "react-redux";
import './editForm.css'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../utils/userSlice';
import { log } from 'console';
import { useNavigate } from 'react-router';

const Base_url="http://localhost:4000/"

function EditFrom() {
  const dispatch = useDispatch()
  const userDetails = useSelector(store => store.user.name)
  const navigate = useNavigate()

 

  const [image, setImage] = useState('')
  const [userName, setUserName] = useState(userDetails)

  const handelUpload = (e) => {
    setImage(e.target.files[0])
  }
  useEffect(() => {

    setUserName(userDetails)
  }, [])


  const submitHandeler = async (e) => {
    e.preventDefault();  
const formData = new FormData();

formData.append('profileimage',image)
formData.append('userName',userName)

    try {
       await axios.post('http://localhost:4000/editProfile',formData,{withCredentials:true}).then((data)=>{
      
       dispatch(userLogin(data.data))
       navigate('/')
       })

    } catch (error) {
      log(error)
      navigate('/')
    }
  }

  const userImage = useSelector(store => store.user.profileImg)

  log(userImage)

  return (
    <div className='container'>

      <div className='Preview'>
        <img src= {Base_url+userImage} className='Profile-img' alt="img" />
      </div>

      <form onSubmit={submitHandeler} encType="multipart/form-data">
        
        <div>
          <label htmlFor="image" >Profile Image</label>
          <input type="file" name='image' accept='image/*' onChange={handelUpload} />
        </div>


        <div>
          <label htmlFor="email">Name</label>
          <input type="text" name='name' value={userName} onChange={(e) => {

            setUserName(e.target.value)
          }} />
        </div>

        <div><button type='submit'>update</button></div>
      </form>
    </div>
  )
}

export default EditFrom