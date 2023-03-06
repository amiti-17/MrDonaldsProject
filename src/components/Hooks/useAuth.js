import { useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
// import { useContext } from 'react';
// import { Context } from '../Functions/context';


export function useAuth(authFirebase) {

  // const {
  //   isHaveBeenLogin,
  //   setIsHaveBeenLogin,
  // } = useContext(Context);

  const [authentication, setAuthentication] = useState(null);

  const provider = new GoogleAuthProvider();

  const logIn = () => {
    signInWithPopup(authFirebase, provider)
      .then((result) => {
        console.warn('Sign - in successful.')
        // if (isHaveBeenLogin && authentication) {
        //   console.log("5");
        // }
      }).catch((e) => {
        const errorCode = e.code;
        console.error('errorCode:', errorCode)
        const errorMessage = e.message;
        console.error('errorMessage:', errorMessage)
        const email = e.customData.email;
        console.error('email:', email)
        const credential = GoogleAuthProvider.credentialFromError(e);
        console.error('credential:', credential)
      })
  }

  const logOut = () => {
    signOut(authFirebase)
      .then(() => {
        // setIsHaveBeenLogin(false);
        console.warn('Sign - out successful.')
      }).catch((e) => {
        console.error(e)
      });
  }

  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setAuthentication(user);
      } else {
        setAuthentication(null);
      }
    })
  }, [authFirebase, authentication])

  return { authentication, logIn, logOut };
}