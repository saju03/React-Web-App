import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Provider } from 'react-redux'
import store from "../utils/store"
import EditFrom from '../components/editProfile/EditFrom'
function EditProfile() {
  return (
    <Provider store={store}>
    <Navbar/>
    <EditFrom/>

    </Provider>
  )
}

export default EditProfile