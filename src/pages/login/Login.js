import { useState,useRef } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

// styles
import styles from './Login.module.css'
import {login} from "../../services/authService";

export default function Login() {
  const email = useRef()
  const password = useRef()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setIsPending(true);
    login(email.current.value, password.current.value)
    .then(() => {
        setIsPending(false)
        navigate('/')
    })
    .catch((error) => {
      // Handle Errors here.
      setIsPending(false)
      setError(error.message)
    });

  }

  return (       
    <div className="fade-in">       
      <form onSubmit={handleSubmit} className={styles['login-form']}>

        <h3>Login</h3>

        <label>
          <span>E-mail:</span>
          <input type="email" ref={email} />
        </label>

        <label>
          <span>Password:</span>
          <input type="password" ref={password} />
        </label>

        { !isPending && (
          <>
            <button className="btn">Login</button>
            <NavLink to="/signup"><button className="btn">Sign Up</button></NavLink>
          </>
        )}

        { isPending && <button className="btn" disabled>Loading...</button> }

        { error && (
          <>
            <br />
            <p>{error}</p>
          </>
        )}      

      </form>
    </div>
  )
}
