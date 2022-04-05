import { useState,useEffect } from 'react';
import { auth } from '../../config/fb_config';
import { GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";
import Board from '../Canvas/Board'

function Login() {

  const [userData, setUserData] = useState(false)
  const provider = new GoogleAuthProvider();

  function SignIn() {
    signInWithPopup(auth,provider)
    .then(result => {
      setUserData(result.user);
      console.log(result.user)
    })
  }

  function SignOut() {
    signOut(auth,provider)
    .then(result => {
      setUserData(false);
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserData(user);
      }
    })
  }, [userData])
  
 
  if (userData) {
    return(
      <>
        <button className='Auth-Button' onClick={() => SignOut()}>Exit</button>
        <Board userData={userData}/>
      </>
    )
  }
  return (
    <div className="Login">
      <button className='Auth-Button' onClick={() => SignIn()}>Login</button>
    </div>
  )
}

export default Login