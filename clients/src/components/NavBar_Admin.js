import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core';
import SecuredLogout from './SecuredLogout'

const itemList = () => {
  return [
    { label: 'Log In', linkto: "/login", active: true },
    { label: 'Log Out', linkto: "/login" },
    { label: 'Sign Up', linkto: "/register" },
    { label: 'About' },
    { label: 'Contact' }
  ]
}

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 0,
    color: 'white',
    height: 30,
    padding: '5px',
    textDecoration: 'none',
    '&:focus': { color:'black',},
    '&:hover': {color: 'red'},
  },
  invisible: { visibility: false}
})

function MenuBar (props) {
  const classes = useStyles()
  return (
      <div style={{backgroundColor: "#2c41b7"}} >
        <span style={{fontSize: "20px", color: "yellow", padding: "0px 150px 0px 10px"}}>ThermoFisher</span>
        {props.items.map(d => (
            <Button 
                onClick={(e) => props.handleClick(d)}
            // disable= { d.label === "Sign Up" && props.user.role != "admin" ? true : false }
            // disabled={d.active}
                key={d.label}>
                <Link to = {d.linkto} className= {classes.root}>{d.label}</Link>
          </Button>
        ))}
      </div>
  )
}

/* const App = (props) => {
  const [items, setItems] = useState(itemList)
  const onHandleClick = d => {
    items.forEach(b => (b.active = false))
    d.active = true
    setItems([...items])
    if (d.label === "Log Out") {
      SecuredLogout()
    }
  }

  return (
    <div>
      <MenuBar handleClick={onHandleClick} user={props.user} items={items} />
    </div>
  )
} */

const App = (props) => {
    const classes = useStyles()
    const [role, setRole] = useState()

    useEffect(()=>{
        setRole(props.user.role)
    }, [props])

    console.log(`role is ${role}`)
    return (
        <div style={{backgroundColor: "#2c41b7"}} >
        <span style={{fontSize: "20px", color: "yellow", padding: "0px 150px 0px 10px"}}>ThermoFisher</span>
            <Button className= {classes.root} component={Link} to="/login" >Log In</Button>
            <Button className= {classes.root} component={Link} to="/login" onClick={SecuredLogout}>Log Out</Button>
            {/* <Button className= {role ? classes.root : classes.invisible} to="/Register">Sign Up</Button> */}
            {role && <Button className= {classes.root} component={Link} to="/Register">Sign Up</Button> }
        </div>
   
    )

}
export default App

