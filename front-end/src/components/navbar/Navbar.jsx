import React, { useEffect } from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { userLogin } from '../../utils/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyUser = async () => {

      if (!cookies.jwt) {

        console.log(cookies);
        navigate('/login')
      } else {
        const { data } = await axios.post('http://localhost:4000', {}, { withCredentials: true })
        if (!data.status) {
          removeCookie('jwt')
          navigate('/login')
        } else {
          
          dispatch(userLogin(data))
        }

      }

    }
    verifyUser();
  },[])


  const userDetails = useSelector(store => store.user.name)
  const [cookies, setCookies, removeCookie] = useCookies([])

  const logout = () => {

    navigate('/login')
    removeCookie('jwt')

    
  }
  
  const editProfile = () => {
    navigate('/editProfile')

    }
  return (
    <div className='headder'>
      <h3>{userDetails} </h3>
      <button className='logoutButton' onClick={logout}>logout</button>
      <button className='editButton' onClick={editProfile}>Edit</button>
    </div>
  )
}

export default Navbar