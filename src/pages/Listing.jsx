import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaShare, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [contactLandlord, setContactLandlord] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="fixed top-[13%] right-[3%] border border-gray-900 bg-white p-2 rounded-full z-10 cursor-pointer "
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare />
      </div>

      {shareLinkCopied && (
        <p className="fixed top-[20%] right-[3%] z-10 bg-green-600 text-black px-2 py-2 rounded-lg">
          Link Copied
        </p>
      )}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto m-4 p-4 lg:space-x-4 shadow-lg rounded-lg bg-white">
        <div className=" w-full h-[200px] lg:h-[400px] ">
          <p className="text-2xl font-semibold my-3 text-blue-700  ">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? "/ month" : " "}
          </p>

          <p className="flex space-x-2 items-center font-semibold">
            <ImLocation2 className="mr-1 text-green-800 " />
            {listing.address}
          </p>

          <div className="my-3  flex space-x-3">
            <p className="w-full bg-red-800 text-white text-center py-2  rounded-md font-semibold text-xl">
              For {listing.type === "rent" ? "Rent" : "Sell"}
            </p>

            <p className="w-full bg-green-800 py-2 text-white text-center  rounded-md font-semibold text-xl">
              {listing.offer &&
                ` $ ${
                  +listing.regularPrice - +listing.discountedPrice
                } discount `}
            </p>
          </div>

          <p className="mb-3 font-semibold">
            {" "}
            <span className=" text-lg ">Description</span> -{" "}
            {listing.description}
          </p>

          <ul className="flex space-x-2 md:space-x-10 mt-6">
            <li className="flex items-center whitespace-nowrap font-semibold">
              <FaBed className="text-lg mr-1" />
              {listing.beds > 1 ? `${listing.beds} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap font-semibold">
              <FaBath className="text-lg mr-1" />
              {listing.baths > 1 ? `${listing.baths} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap font-semibold">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? ` Parking` : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap font-semibold">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? `Furnished` : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div onClick={() => setContactLandlord(true)} className="mt-6">
              <button className="bg-blue-600 py-3 px-7 text-white text-center uppercase font-medium rounded shadow-md hover:shadow-lg hover:bg-blue-700 focus:bg-blue-700 focus:shadow-lg transition duration-150 ease-in-out w-full ">
                contact the landlord
              </button>
            </div>
          )}

          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="  w-full h-[200px] lg:h-[400px] ">
          
        </div>
      </div>
    </main>
  );
}
