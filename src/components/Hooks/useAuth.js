import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export function useAuth(authFirebase) {

  const [authentication, setAuthentication] = useState(null);

  const provider = new GoogleAuthProvider();

  // console.log('authFirebase.currentUser: ', authFirebase.currentUser)

  const logIn = () => {
    signInWithPopup(authFirebase, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log('credential:', credential)
        // const token = credential.accessToken;
        // console.log('token:', token)
        // The signed-in user info.
        // const user = result.user;
        // console.log('user:', user);
        // Sign-in successful.
        console.warn('Sign - in successful.')

      }).catch((e) => {
        const errorCode = e.code;
        console.error('errorCode:', errorCode)
        const errorMessage = e.message;
        console.error('errorMessage:', errorMessage)
        // The email of the user's account used.
        const email = e.customData.email;
        console.error('email:', email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(e);
        console.error('credential:', credential)
      })
  }

  const logOut = () => {
    signOut(authFirebase)
      .then(() => {
        // Sign-out successful.
        console.warn('Sign - out successful.')
      }).catch((e) => {
        // An error happened.
        console.error(e)
      });
  }

  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setAuthentication(user);
        // console.log('user: ', user);
      } else {
        setAuthentication(null);
      }
    })
  }, [authFirebase, authentication])

  return { authentication, logIn, logOut };
}