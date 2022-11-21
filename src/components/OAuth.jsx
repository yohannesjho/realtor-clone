import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { toast } from 'react-toastify';
import { db } from '../firebase';
import {   useNavigate} from "react-router-dom"

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
     const auth = getAuth();
     const provider = new GoogleAuthProvider()
     const result =await  signInWithPopup(auth,provider)
     const user = result.user

     const docRef = doc(db,"users",user.uid)
     const snapDoc = await getDoc(docRef)

     if(!snapDoc.exists()){
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timeStamp: serverTimestamp()
      });
     }

     navigate("/")
     
    } catch (error) {
      toast.error("could not authorize with Google")
      console.log(error)
    }
  }

  return (
    <button type="button" onClick={onGoogleClick} className='flex items-center justify-center border-4 w-full bg-red-600 px-7 py-3 text-white uppercase rounded-lg hover:bg-red-800 active-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-500ms ease-in-out'>
        <FcGoogle className="bg-white rounded-full mr-[4px] text-xl"/>
         continue with google
    </button>
  )
}
