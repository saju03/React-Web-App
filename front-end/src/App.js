
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from "./pages/HomePage"
import './index.css'

import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
      
          <Route exact path="/" element={<HomePage />} />
        
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />


      </Routes>
    </BrowserRouter>

  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />)