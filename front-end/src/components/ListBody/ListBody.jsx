import React, { useEffect, useState } from 'react'
import axios from 'axios'
import List from '../list/List';
import './listbody.css'
import { useNavigate } from 'react-router';


function ListBody() {
  const navigate = useNavigate()
  const[userData,setData] = useState([])
  const[searchTxt,setSearchText] = useState('')
  
  
  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:4000/admin/getuserdatas')
   
     setData(data.data)
 }

 const addUser = (e)=>{

  e.preventDefault();
  navigate('/admin/add-user')

  

 }

  useEffect(() => {
    fetchData();
  }, [searchTxt])

  const searchText = (e)=>{
   
    setSearchText(e.target.value)
  }
  const search = ()=>{
 let data = userData.filter((users)=> users.name.includes(searchTxt))
    setData(data)
  }

  return (
    <div className='isList'>

<div>
  <input type="text" placeholder='search' onChange={searchText}/>
  <button onClick={search}>Search</button>
  <button className='addBtn' onClick={addUser}>add user</button>

</div>


  

      {userData.map((elem)=>{

        return  <List props={elem} key={elem._id}/>
        
        })}


     
    </div>
    
  )
}

export default ListBody