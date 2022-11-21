import { getAuth,  } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name:  auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const { name, email } = formData;
 

  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  return (
    <>
       <h1 className="text-center font-bold text-3xl mt-6">My profile</h1>
      <div className="flex justify-center   ">
        <form className="  flex flex-col space-y-5 w-full sm:w-1/2 lg:w-1/3  mt-4 mx-6    justify-center">
         
          <input type="text" id="name" value={name} disabled  className="bg-white text-gray-700 px-4 rounded-md "/>
          <input type="email" id="email" value={email} disabled className="bg-white text-gray-700 px-4 rounded-md " />
          <div className="flex justify-between text-sm   md:text-lg whitespace-nowrap " >
            <p>
              Do want to change your name? <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer">Edit</span>
            </p>
            <p onclick={onLogout} className="text-green-600 cursor-pointer">Sign out</p>
          </div>
        </form>
      </div>
    </>
  );
}
