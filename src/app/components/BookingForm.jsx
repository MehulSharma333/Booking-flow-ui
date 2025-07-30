"use client";
import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid"; // Close icon
import Image from "next/image"; // For the ticket image
import { Fragment } from "react";


export default function BookingForm() {
  const [tripType, setTripType] = useState("one-way"); // "one-way" or "round-trip"
   const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    leavingFrom: "",
    goingTo: "",
    departDate: "",
    returnDate: "",
    travellers: 1,
    addPlaceToStay: false,
    addCar: false,
  });
    const states = [
    "Maharashtra",
    "Karnataka",
    "Delhi",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Rajasthan",
    "Gujarat",
    "West Bengal",
    "Punjab",
    "Kerala"
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
const [travelList, setTravelList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

   const goingToOptions = states.filter(
    (state) => state !== formData.leavingFrom
  );

    const handleSearch = () => {
    setError(""); // Clear any existing error first

    if (!formData.leavingFrom) {
      setError("Please select Leaving from");
      return;
    }
    if (!formData.goingTo) {
      setError("Please select Going to");
      return;
    }
    if (!formData.departDate) {
      setError("Please select departure date");
      return;
    }
    if (tripType === "round-trip" && !formData.returnDate) {
      setError("Please select return date");
      return;
    }
    if (formData.travellers < 1) {
      setError("Please enter at least 1 traveller");
      return;
    }

    // ✅ Place for other logic you want to add later
    console.log("All data valid. Proceed to search:", formData);
    // Generate random travel list (5–10 items)
const randomCount = Math.floor(Math.random() * 6) + 5; // 5–10
const list = Array.from({ length: randomCount }, (_, i) => ({
  id: i + 1,
  title: `Travel Option #${i + 1}`,
  time: `${8 + i}:00 AM`, // simple fake time
  price: `₹${(1000 + i * 250).toLocaleString()}`
}));
setTravelList(list);
setIsModalOpen(true);
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full space-y-6">
      {/* Tabs */}
      <div className="flex justify-center sm:justify-start space-x-4">
        <button
          onClick={() => setTripType("one-way")}
          className={`px-3 py-2 rounded ${
            tripType === "one-way"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          One-way
        </button>
        <button
          onClick={() => setTripType("round-trip")}
          className={`px-3 py-2 rounded ${
            tripType === "round-trip"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Round-trip
        </button>
      </div>

      {/* Input fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <CustomSelect
  label="Leaving from"
  options={states}
  value={formData.leavingFrom}
  onChange={(value) =>
    setFormData((prev) => ({ ...prev, leavingFrom: value, goingTo: "" }))
  }
/>
        {/* Going to */}
        <CustomSelect
  label="Going to"
  options={goingToOptions}
  value={formData.goingTo}
  onChange={(value) =>
    setFormData((prev) => ({ ...prev, goingTo: value }))
  }
  disabled={!formData.leavingFrom}
/>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <DatePicker
    selected={formData.departDate}
    onChange={(date) => setFormData((prev) => ({ ...prev, departDate: date }))}
    placeholderText="Departure date"
    dateFormat="dd/MM/yyyy"
    className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-white text-gray-800 shadow-sm 
      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
      hover:border-blue-400 transition duration-200 ease-in-out"
  />
  {tripType === "round-trip" && (
    <DatePicker
      selected={formData.returnDate}
      onChange={(date) => setFormData((prev) => ({ ...prev, returnDate: date }))}
      placeholderText="Return date"
      dateFormat="dd/MM/yyyy"
      className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-white text-gray-800 shadow-sm 
        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
        hover:border-blue-400 transition duration-200 ease-in-out"
    />
  )}
</div>

      </div>

      {/* Travellers */}
   <div className="flex flex-col sm:flex-row sm:items-center gap-4">
  <label className="flex-1">
    <span className="block mb-1 text-sm font-medium">Travellers</span>
    <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm 
      focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 
      transition duration-200 ease-in-out">
      
      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            travellers: Math.max(1, prev.travellers - 1),
          }))
        }
        className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300"
        disabled={formData.travellers <= 1}
      >
        –
      </button>

      <input
        type="number"
        name="travellers"
        min="1"
        value={formData.travellers}
        onChange={handleInputChange}
        className="w-full text-center bg-transparent focus:outline-none px-2 py-2"
      />

      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            travellers: prev.travellers + 1,
          }))
        }
        className="px-3 py-2 text-gray-500 hover:text-gray-700"
      >
        +
      </button>
    </div>
  </label>
</div>


      {/* Add-ons */}
      <div className="flex flex-col sm:flex-row gap-4">
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      name="addPlaceToStay"
      checked={formData.addPlaceToStay}
      onChange={handleInputChange}
      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 
                 transition duration-150 ease-in-out"
    />
    <span className="text-sm text-gray-800">Add a place to stay</span>
  </label>
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      name="addCar"
      checked={formData.addCar}
      onChange={handleInputChange}
      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 
                 transition duration-150 ease-in-out"
    />
    <span className="text-sm text-gray-800">Add a car</span>
  </label>
</div>

     {error && (
  <div
    className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium 
      shadow-sm animate-fadeIn"
  >
    {error}
  </div>
)}

      {/* Search button */}
      <div className="flex justify-center sm:justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded w-full sm:w-auto"
         onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <Transition appear show={isModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
    {/* Background blur */}
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
      leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
          leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            {/* Close button */}
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Ticket image */}
            <div className="flex justify-center mb-4">
              <Image src="/ticket.png" alt="Ticket" width={120} height={80} />
            </div>

            {/* Travel details */}
            <div className="mb-4 text-center">
              <p className="font-semibold text-gray-800">
                {formData.leavingFrom} → {formData.goingTo}
              </p>
              <p className="text-sm text-gray-500 mt-1">Enjoy your trip with us!</p>
            </div>

            {(formData.addPlaceToStay || formData.addCar) && (
  <div className="flex justify-center gap-4 mb-4">
    {formData.addPlaceToStay && (
      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
        + Place to stay
      </span>
    )}
    {formData.addCar && (
      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
        + Car rental
      </span>
    )}
  </div>
)}

            {/* Travellers & trip type */}
            <div className="flex justify-center gap-4 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">Travellers</span>
                <span className="font-medium">{formData.travellers}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500 text-xs">Trip Type</span>
                <span className="font-medium capitalize">{tripType.replace("-", " ")}</span>
              </div>
            </div>

            {/* Travel list */}
            <div className="space-y-2">
              {travelList.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 border rounded-md shadow-sm hover:shadow transition">
                  <div>
                    <p className="text-gray-800 font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                  <p className="text-blue-600 font-semibold">{item.price}</p>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>

    </div>
  );
}
