import React,{useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
function Login() {
  const navigate = useNavigate()
  const [values,setValues ] = useState({
    email:'',
    password:'',
});



const [cookies,setCookies,removeCookie]= useCookies([])

const verifyUser = async()=>{


 if(cookies.jwt){
   navigate('/')
   const {data} = await axios.post('http://localhost:4000',{},{withCredentials:true})
 if(!data.status){
   removeCookie('jwt')
   navigate('/login') 
 }
 }

}

useEffect(()=>{
  verifyUser();
})


const handelSubmit = async (e)=>{

    e.preventDefault();
    try {
  
      const { data } = await axios.post('http://localhost:4000/login',{
        ...values
      })

      if (data) {
        
       console.log(data);
        if (data.errors) {
       
          const { email, password,name } = data.errors;
          if (name){ generateError(name)}
          else if (password) {generateError(password)}
          else if (email){generateError(email)}
          
        
        }
        else {
          navigate('/')
          console.log(cookies);
          document.cookie=`jwt = ${data.jwt}`
          }
      }
    } catch (error) {
      console.log(error);
    } 
}
  return (
    <div className='container'>
        <h2>Login to Your Account</h2>
        <form  onSubmit={handelSubmit}>
            <div>
                <label htmlFor="email">email</label>
                <input type="email" name='email' placeholder='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <button type='submit'>Submit</button>
            <span>Don't have an account<Link to='/register'>Register</Link></span>

        </form>

        <ToastContainer/>
    </div>
  )
}

export default Login