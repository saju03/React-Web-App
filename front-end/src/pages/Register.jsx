import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer , toast } from 'react-toastify'
import { log } from 'console';


function Register() {

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
          navigate('/login')

          }
      }

    } catch (error) {

    }


  }

  return (
    <div className='container'>
      <h2>Register Account</h2>
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
        <span>already have an account<Link to='/login'>Login</Link></span>
       
      </form>
 <ToastContainer />
    </div>
  )
}

export default Register