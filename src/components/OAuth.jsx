import React from 'react'
import { FcGoogle } from "react-icons/fc"

export default function OAuth() {
  return (
    <button className='flex items-center justify-center border-4 w-full bg-red-600 px-7 py-3 text-white uppercase rounded-lg hover:bg-red-800 active-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-500ms ease-in-out'>
        <FcGoogle className="bg-white rounded-full mr-[4px] text-xl"/>
         continue with google
    </button>
  )
}
