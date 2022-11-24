import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "sell",
    name: "",
    beds: 1,
    baths: 1,
    parking: true,
    fernished: true,
    address: "",
    description: "",
    offer:false,
    RPrice:0,
    DPrice:0,
  });
  const { type, name, beds, baths, parking, fernished, address, description, offer, RPrice, DPrice } =
    formData;

  function onChange() {}
  return (
    <main className="  px-2 max-w-md mx-auto">
      <h1 className="text-center text-3xl font-medium mt-4">
        Create a listing
      </h1>
      <form>
        <p className="font-semibold  mt-4 text-lg">Sell/Rent</p>
        <div className=" flex   space-x-6">
          <button
            type="button"
            id="button "
            value="sale"
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sell" ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="button "
            value="sale"
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out  w-full ${
              type === "rent" ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            Rent
          </button>
        </div>
        <p className="mt-6 font-medium text-lg ">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="name"
          maxLength="32"
          minLength="4"
          required
          className="w-full py-2 px-3 border  border-gray-300  focus:border-slate-700 bg-white focus:bg-white focus:text-slate-700 transition duration-150 ease-in-out mb-6 rounded-lg "
          onChange={onChange}
        />

        <div className="flex space-x-6 mb-16">
          <div>
            <p className="font-medium text-lg ">Beds</p>
            <input
              type="number"
              id="beds"
              max="50"
              min="1"
              value={beds}
              required
              className="py-1.5 px-3 w-[100px] text-center rounded-lg bg-white focus:bg-white border-gray-300  focus:border-slate-700  focus:text-slate-700 transition duration-150 ease-in-out"
              onChange={onChange}
            />
          </div>
          <div>
            <p className="font-medium text-lg ">Baths</p>
            <input
              type="number"
              id="beds"
              max="50"
              min="1"
              value={baths}
              required
              className="py-1.5 px-3 w-[100px] text-center rounded-lg bg-white focus:bg-white border-gray-300  focus:border-slate-700  focus:text-slate-700 transition duration-150 ease-in-out"
              onChange={onChange}
            />
          </div>
        </div>

        <p className="font-semibold  mt-4 text-lg">Parking Spot</p>
        <div className=" flex   space-x-6  mb-12">
          <button
            type="button"
            id="parking "
            value={parking}
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="parking"
            value={parking}
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out  w-full ${
              parking ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        <p className="font-semibold  mt-4 text-lg">Fernished</p>
        <div className=" flex   space-x-6">
          <button
            type="button"
            id="fernished "
            value={fernished}
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !fernished ? "bg-slate-600 text-white" : "bg-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="fernished "
            value={fernished}
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out  w-full ${
              fernished ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        <p className="mt-6 font-medium text-lg ">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          required
          className="w-full py-2 px-3 border  border-gray-300  focus:border-slate-700 bg-white focus:bg-white focus:text-slate-700 transition duration-150 ease-in-out mb-6 rounded-lg "
          onChange={onChange}
        />
        <p className="mt-6 font-medium text-lg ">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          required
          className="w-full py-2 px-3 border  border-gray-300  focus:border-slate-700 bg-white focus:bg-white focus:text-slate-700 transition duration-150 ease-in-out mb-6 rounded-lg "
          onChange={onChange}
        />

        <p className="font-semibold  mt-4 text-lg">Offer</p>
        <div className=" flex   space-x-6  mb-12">
          <button
            type="button"
            id="offer "
            value={offer}
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="offer"
            value={offer}
            onClick={onChange}
            className={`font-medium text-lg uppercase px-3 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out  w-full ${
              offer ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
          >
            No
          </button>
        </div>

        <p className="font-semibold text-lg">Regular Price</p>
         <div className="flex space-x-6">
         <input type="number" id="rprice" value={RPrice} onChange={onChange} className="py-1.5 px-3 text-center border border-gray-300 focus:border-gray-700 bg-white focus:text-slate-700 shadow-lg rounded-lg mb-12"/>
         {type==="rent" && <p>$/Month</p>}

         </div>
         <p className="font-semibold text-lg">Discounted Price</p>
         <div className="flex space-x-6">
        
         <input type="number" id="dprice" value={DPrice} onChange={onChange} className="py-1.5 px-3 text-center border border-gray-300 focus:border-gray-700 bg-white focus:text-slate-700 shadow-lg rounded-lg"/>
         {offer === true && <p>$/Month</p>}
         </div>

        <div className="">
            <p className="font-semibold text-lg ">Images</p>
            <p className="text-gray-700 ">The first image will be the cover</p>
            <input type="file" id="images" accept="jpg,png,jpeg" multiple required  onChange={onChange} className="py-2 px-4 bg-white w-full border  border-gray-300 focus:border-slate-600 bg-white focus:bg-white rounded transition duration-150 ease-in-out" />
        </div>

        <button type="submit" onChange={onChange} className="w-full bg-blue-600 focus:bg-blue-700 px-4 py-2 mt-6 rounded-md text-white text-lg uppercase shadow-md focus:shadow-lg active-shadow-lg hover:shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out mb-6">create listing</button>
      </form>
    </main>
  );
}
