import React, { useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import http from '../api/http-common'

const App = (props) =>{
    const [file, setFile] = useState(null)
    const certData = props.certData
    console.log("calDue: ", certData.calDue)

    const handleChange = (e) => {
      setFile(e.target.files[0])
    }

    const onFileUpload = () => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("CEIDin", certData.calEqID)
      formData.append("CertNumIn", certData.newCertNum)
      formData.append("CalDateIn", certData.lastCal)
      formData.append("CalDueIn", certData.calDue)

      console.log("formData: ", formData)
      //send formData object HERE..!
      http.post(`/mfccal/cert/equipment/upload`, formData)
      .then(res => {
        console.log(res.statusText)
      })
    }

    return(
      <>
        <Grid item xs={6}>Cert. File<input type="file" onChange={handleChange} /></Grid>
        <Grid item xs={2}><input type="submit" className="upload" value="Upload!" onClick={onFileUpload} />
        </Grid>
      </>
    )
}

export default App;