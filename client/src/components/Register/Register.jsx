import React, { useState } from 'react'
import style from './Register.module.css'

export default function Register() {

    const [username ,setUsername] = useState('')
    const [password ,setPassword] = useState('')

    const handleUsername = (e) => {
        setUsername(e.target.value)

    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    async function register (e){
        e.preventDefault();
        const response =  await fetch('http://localhost:3000/register',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-type':'application/json'}
        })
        if(response.ok) {
            alert('Registration Success');
        }else {
            alert('Registration Failed');
        }
    }
  return (
    <div className={style.container}>
        <form action="post" className={style.form} onSubmit={register}>
            <span>Register</span>
                <input type="text" 
                placeholder='Username'
                value={username} 
                onChange={handleUsername}    
                />
                <input type="text" 
                placeholder='Password' 
                value={password}
                onChange={handlePassword}
                 />
                <button>Register</button>
        </form>
    </div>
   
  )
}
