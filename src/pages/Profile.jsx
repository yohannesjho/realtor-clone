import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(){
     try {
       if(auth.currentUser.displayName != name){
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        const docRef = doc(db, "users", auth.currentUser.uid)

        await updateDoc(docRef,{
          name,
        })

        toast.success("update is successful!")
       }
     } catch (error) {
        toast.error("Could not update the profile!")
     }
  }
  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-6">My profile</h1>
      <div className="flex justify-center   ">
        <form className="  flex flex-col space-y-5 w-full sm:w-1/2 lg:w-1/3  mt-4 mx-6    justify-center">
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className= {`bg-white text-gray-700 px-4 rounded-md ${changeDetail && "bg-red-300 focus:bg-red-300"}`}
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="bg-white text-gray-700 px-4 rounded-md "
          />
          <div className="flex justify-between text-sm   md:text-lg whitespace-nowrap ">
            <p>
              Do want to change your name?{" "}
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer"
              >
                {changeDetail ? "Apply Change" : "Edit"}
              </span>
            </p>
            <p onClick={onLogout} className="text-green-600 cursor-pointer">
              Sign out
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
