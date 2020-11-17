import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleClick (event) {
    event.preventDefault()
    if (email !== '' && password !== '') {
      const res = await fetch('https://test7657.bubbleapps.io/version-test/api/1.1/wf/sign_in', {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({ 'email': email, 'password': password})
      })

      const resData = await res.json()

      if (resData.status === 'success') {
        console.log(resData.response)
        localStorage.setItem('user', JSON.stringify(resData.response))
        document.location.href = '/login'
      } else {
        console.log(resData)
        setMessage(resData.message)
      }
    }
  }

  function handleChangeEmail (event) {
    setEmail(event.target.value)
  }

  function handleChangePassword (event) {
    setPassword(event.target.value)
  }

  return (
    <div className="signIn" style={{width: '500px'}}>
      <form>
        <div className="field">
          <div className="control">
            <input className="input" type="email" placeholder="email" value={email} onChange={handleChangeEmail}/>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input" type="password" placeholder="password" value={password} onChange={handleChangePassword}/>
            {message && <p style={{ color: 'red' }} className="help">{message}</p>}
          </div>
        </div>

        <button className="button" onClick={handleClick}>sign in</button>
      </form>
      <br/>
      <Link to="/login">login</Link>

    </div>
  )
}
