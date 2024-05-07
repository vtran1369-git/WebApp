import React from 'react'
import AuthenService from '../api/auth.service_admin'
import { removeLocalCDMList, removeLocalTFL } from '../Utils/locStorage'

const App = (props) =>{
    AuthenService.logout()
    removeLocalTFL()
    removeLocalCDMList()
  }

export default App;