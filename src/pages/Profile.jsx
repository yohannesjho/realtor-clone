import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);

        await updateDoc(docRef, {
          name,
        });

        toast.success("update is successful!");
      }
    } catch (error) {
      toast.error("Could not update the profile!");
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-6 mb-6">My profile</h1>
      <div className="flex justify-center   ">
        <form className="  flex flex-col space-y-5 w-full sm:w-1/2 lg:w-1/3  mt-4 mx-6    justify-center">
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
            className={`bg-white text-gray-700 px-4 rounded-md ${
              changeDetail && "bg-red-300 focus:bg-red-300"
            }`}
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

      <div className="flex justify-center mt-6 ">
        <button
          type="submit"
          className=" w-full sm:w-1/2 lg:w-1/3 my-4 mx-6 py-3  bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out text-white uppercase rounded-md shadow-md hover:shadow-lg"
        >
          <Link to="/create-listing" className="flex justify-center ">
            <FcHome className="text-3xl mx-1 bg-red-200 rounded-full p-1" />
            Sell or rent your house
          </Link>
        </button>
      </div>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold">My Listings</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
