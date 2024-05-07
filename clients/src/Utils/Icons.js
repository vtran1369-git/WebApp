import React from 'react';
import Home from '@material-ui/icons/Home';
import AddNew from '@material-ui/icons/AddCircleOutlineRounded';

const HomeIcon = () => {
    return (
      <div>
      	<Home></Home>
      </div>
    );
}

const AddNewIcon = () => {
    return (
      <div>
      	<AddNew style={{fontSize: 40}}></AddNew>
      </div>
    );
}


export default AddNewIcon;