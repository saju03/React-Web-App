import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Provider } from "react-redux"
import store from "../utils/store"




function HomePage() {



  return (
    <div>
        <Provider store={store}>
                <Navbar/>
        </Provider>
    </div>
  )
}

export default HomePage