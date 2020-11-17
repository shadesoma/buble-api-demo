import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home () {

  const [email, setEmail] = useState('');

  useEffect( () => {
    const fetchData = async () => {
      const user = await JSON.parse(localStorage.getItem('user'))

      const res = await fetch(
        'https://test7657.bubbleapps.io/version-test/api/1.1/wf/getuser', {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
        })

      const resData = await res.text()
      setEmail(resData)
    }
    fetchData()
  }, []);

  return (
    <div>
      {email ? (<h1 className="title">Congratulations, you have successfully logged in as {email}</h1>) : (
        <div>
          <h1 className="title">You are not logged in! Log in or register.</h1>
          <Link to="/login">login</Link>
          <br/>
          <Link to="/sign-in">sign in</Link>
        </div>
      )}
    </div>
  )
}
