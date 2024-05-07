import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Form.css';
import  { useForm } from 'react-hook-form';



async function loginUser(credentials) {
 return fetch('http://localhost:8080/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { register , handleSubmit, formState: { errors } } = useForm()

//   const handleSubmit = async e => {
    const onSubmit = async e => {
    // e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Username</p>
          <input type="text" {...register("username", {required: "required"})} onChange={e => setUserName(e.target.value)} />
          {errors.username && errors.username.message}
          
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register("password", {required: "required"})} onChange={e => setPassword(e.target.value)} />
            {errors.password && errors.password.message}
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};