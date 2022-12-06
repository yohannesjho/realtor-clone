import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
  import { toast } from "react-toastify";
  import ListingItem from "../components/ListingItem";
  import Spinner from "../components/Spinner";
  import { db } from "../firebase";
  
  export default function Category() {
    const [offerListing, setOfferListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchListing] = useState(null);
    const params = useParams()
    useEffect(() => {
      async function fetchListings() {
        try {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("type", "==", params.categoryName),
            orderBy("timestamp", "desc"),
            limit(12)
          );
  
          const querySnap = await getDocs(q);
          const lastVisible = querySnap.docs[querySnap.docs.length - 1];
          setLastFetchListing(lastVisible);
  
          let listings = [];
  
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
  
          setOfferListing(listings);
          setLoading(false);
        } catch (error) {
          toast.error("Could't find offer");
        }
      }
      fetchListings();
    }, [params.categoryName]);
  
    async function onFetchMoreListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          startAfter(lastFetchedListing),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListing((prevState)=>[...prevState, ...listings]);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
    }
  
    return (
      <div className="max-w-6xl mx-auto px-3">
            <h2 className="text-3xl text-center mt-6 font-bold">
                {params.categoryName === "rent" ? "Places for rent" : "Places for sale"}
            </h2>
            {loading ? (
              <Spinner/>
            ) : offerListing && offerListing.length >0 ? (
              <> 
                  <ul className="sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {offerListing.map((listing)=>(
                      <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                    ))}
                  </ul>
  
                  {lastFetchedListing && (
              <div className="flex justify-center items-center">
                <button
                  onClick={onFetchMoreListings}
                  className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
                >
                  Load more
                </button>
              </div>
            )}
              </>
            ) : (
              <p>There are no current offer</p>
            )}
      </div>
    );
  }
  