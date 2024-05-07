import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackToPreviousPage = () => {
    return(
      <>
        <div><button style={{height: "28px"}} onClick={()=>window.location.reload()} >Back To Listing Page</button></div>
      </>
    )
  }

  export default BackToPreviousPage