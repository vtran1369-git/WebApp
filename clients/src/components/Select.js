import React, { useState, Component } from 'react';
import { render } from 'react-dom';

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [addrtype, setAddrtype] = useState(["Normal", "Admin"])
    const Add = addrtype.map(Add => Add)

    const handleAddrTypeChange = (e) => { 
            console.clear(); 
            console.log((addrtype[e.target.value])); 
            setRole(addrtype[e.target.value]) 
                }
    const [role, setRole] = useState('Normal')
    const handleSubmit = (event) => {
    event.preventDefault();
    console.log
        (`
        Name: ${name}
        Email: ${email} 
        Role: ${role}           
    `);
    };

    return(
    
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
            value={name}
            placeholder="Name"
            required
            onChange={(event) => setName(event.target.value)}
        ></input>

        <label htmlFor="email">Email</label>
        <input
            value={email}
            placeholder="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label for="role">Choose a Role:</label>
        < select
            onChange={e => handleAddrTypeChange(e)}
            className="browser-default custom-select" >
            {
                Add.map((address, key) => <option key={key} value={key}>{address} 
                    </option>)
            }
        </select >
        <div class="wrapper">
            <button type="submit" className="button">Create User</button>
        </div>
    </form >
   
    )
}
export default App;
/* const App = () => {
  const [addrtype, setAddrtype] = useState(["Work", "Home", "school"])
  const Add = addrtype.map(Add => Add
  )

  const handleAddrTypeChange = (e) => {console.clear(), console.log((addrtype[e.target.value]))}

  return (
    < select
      onChange={e => handleAddrTypeChange(e)}
      className="browser-default custom-select" >
      {
        Add.map((address, key) => <option key={key}value={key}>{address}</option>)
      }
    </select >)
}

export default App; */
