import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Provider } from "react-redux"
import store from "../utils/store"

import {useCookies} from 'react-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router'



function HomePage() {
  // ////////////////////////////////////////////////////////////
const navigate = useNavigate();
const [cookies,setCookies,removeCookie]= useCookies([])

  return (
    <div>
        <Provider store={store}>
                <Navbar/>
        </Provider>
    </div>
  )
}

export default HomePage