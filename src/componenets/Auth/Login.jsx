/* eslint-disable no-unused-vars */
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
      <div className="Container">
        <Board userData={userData} signOut={signOut}/>
      </div>
    )
  }
  return (
    <div className="Container">
      <div className='Auth-Button' onClick={() => SignIn()}>[ Login ]</div>
    </div>
  )
}

export default Login