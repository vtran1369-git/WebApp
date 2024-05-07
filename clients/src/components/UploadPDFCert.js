import React, { useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import http from '../api/http-common'

const App = () =>{
    const [file, setFile] = useState(null)

    const handleChange = (e) => {
      setFile(e.target.files[0])
    }

    const onFileUpload = () => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("id", "111")

      console.log("formData: ", formData)
      //send formData object HERE..!
      http.post(`/mfccal/cert/equipment/upload`, formData)
      .then(res => {
        console.log(res.statusText)
      })
    }

    return(
      <>
        Cert.File
        <Grid item xs={7}><input type="file" onChange={handleChange} /></Grid>
        <Grid item xs={5}><input type="submit" value="Upload!" onClick={onFileUpload} />
        </Grid>
      </>
    )
}

export default App;