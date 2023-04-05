import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer , toast } from 'react-toastify'
import { log } from 'console';
import AdminNav from '../components/adminNav/AdminNav';


function AddUser() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });


  const generateError = (err) => {
    console.log(err);
    toast.error(err, {
      position: 'top-right'
    })
  }


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4000/register', {
        ...values
      }, { withCredentials: true }
      )

      if (data) {
     
        log(data)
        if (data.errors) {
       
          const { email, password,name } = data.errors;
          if (name){ generateError(name)}
          else if (password) {generateError(password)}
          else if (email){generateError(email)}
          
        
        }
        else {
          navigate('/admin')

          }
      }

    } catch (error) {

    }


  }

  return (
    <>
    <div>
        <AdminNav/>
    </div>
    <div className='container'>
      <h2>Add User Account</h2>
      <form onSubmit={(e) => { handelSubmit(e) }}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' placeholder='name' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name='email' placeholder='email' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='password' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
        </div>
        <button type='submit'>Submit</button>

        <button onClick={(e)=>{
            e.preventDefault();
            navigate('/admin')
        }}>cancel</button>
       
       
      </form>
 <ToastContainer />
    </div>
    </>
  )
}

export default AddUser