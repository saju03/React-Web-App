
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from "./pages/HomePage"
import './index.css'

import 'react-toastify/dist/ReactToastify.css'
import EditProfile from "./pages/EditProfile"
import AdminPage from "./pages/AdminPage"
import AdminLogin from './pages/AdminLogin'
import { Provider } from "react-redux"
import store from "./utils/store"
import UserEdit from "./pages/UserEdit"
import AddUser from "./pages/AddUser"
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
      
          <Route exact path="/" element={<HomePage />} />
        
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/admin/editUser" element={<UserEdit />} />
        <Route exact path="/admin/add-user" element={<AddUser />} />
        <Route exact path="/admin/login" element={
        <Provider store={store}>
        <AdminLogin />
        </Provider>
        } />


      </Routes>
    </BrowserRouter>

  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)