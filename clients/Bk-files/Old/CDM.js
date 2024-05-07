import React, { useState, useEffect, useRef } from "react";
import Table_CDMList_Limit2 from './Table_CDMList_Limit2'
import Header from "./Header";
import {Grid} from '@material-ui/core'

function App() {
  return (
    <>
        <Header name="CDM Listing" />
        <Grid item xs={12} className="App-tbl">
          <Table_CDMList_Limit2 />  
         </Grid>
    </>
  )
}
  
export default App;
