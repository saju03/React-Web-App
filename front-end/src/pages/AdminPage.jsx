import React from 'react'
import AdminNav from '../components/adminNav/AdminNav'
import ListBody from '../components/ListBody/ListBody'
import store from '../utils/store'
import { Provider } from "react-redux"

function AdminPage() {

  return (
    <div>
      
      <Provider store={store}>
      <AdminNav/>
      <ListBody/>
      </Provider>
    </div>
  )
}

export default AdminPage