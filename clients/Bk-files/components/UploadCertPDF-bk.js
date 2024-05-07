import React, { useRef, useState } from 'react';
/* import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; */
import { Grid } from '@material-ui/core';
import http from '../api/http-common'

const App = () =>{
    // const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null)
    const filePathRef = useRef(null)

    /* const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        console.log(">>file choosed: ", file)
        console.log("file_current.value: ", filePathRef.current.value)
        console.log("filename: ", filePathRef.current.files[0].name)
        console.log("file: ", filePathRef.current.files[0])
        console.log("state: file: ", file)
    };
    const handleCancel = () => {
      setOpen(false)
    }
 */
    const handleChange = (e) => {
      setFile(e.target.files[0])
    }

    const onFileUpload = () => {
      const formData = new FormData()
      formData.append(
        "file",
        file,
        // file.name
      )
    
      console.log("file: ", file)
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
   /*  return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Cert. File For Upload
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose Cert File</DialogTitle>
            <DialogContent>
              <DialogContentText>
               Please Choose a Certification File For Upload
              </DialogContentText>
              <input
                autoFocus
                margin="dense"
                id="filename"
                label="filename"
                type="file"
                defaultValue = {file}
                ref = {filePathRef}
                fullWidth
                onChange={(e)=>setFile(e.target.files[0])}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    ); */
}

export default App;