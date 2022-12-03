import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Landlord data could not found");
      }
    }
    getLandlord();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord !== null && (
        <div className=" my-6">
          <p className="mb-3 font-semibold text-md ">
            contact {landlord.name} for {listing.name}
          </p>
          <div className="">
            <textarea
              className="w-full border border-gray-700 focus:border-slate-600 bg-white focus:bg-white px-4 py-2 text-gray-600 "
              name="message"
              id="message"
              value={message}
              rows="2"
              onChange={onChange}
            ></textarea>
          </div>
           
            <a
              className=""
              href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
            >
              <button type="button" className="bg-blue-600 w-full text-white text-center text-lg font-semibold uppercase  py-2 px-3 mt-3 rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">send message</button>
            </a>
           
        </div>
      )}
    </>
  );
}
