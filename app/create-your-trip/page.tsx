"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function CreateYourTrip() {
  const [trip, setTrip] = useState({
    title: "",
    location: "",
    budget: "",
    duration: "",
    type: "",
    activityType: "",
    transport: "",
    image: "",
    details: [{ day: 1, activity: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...trip.details];
    newDetails[index].activity = value;
    setTrip({ ...trip, details: newDetails });
  };

  const addDay = () => {
    setTrip({
      ...trip,
      details: [...trip.details, { day: trip.details.length + 1, activity: "" }],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedTrips = JSON.parse(localStorage.getItem("userTrips") || "[]");
    const newTrip = {
      ...trip,
      id: Date.now(),
      keywords: [trip.location, trip.type, trip.activityType],
    };

    localStorage.setItem("userTrips", JSON.stringify([...storedTrips, newTrip]));
    alert("Trip created! It will now appear on the Home Page.");

    setTrip({
      title: "",
      location: "",
      budget: "",
      duration: "",
      type: "",
      activityType: "",
      transport: "",
      image: "",
      details: [{ day: 1, activity: "" }],
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-black">Create Your Own Trip</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/create-your-trip" className="hover:text-blue-600">Create Trip</Link>
            <Link href="/profile" className="hover:text-blue-600">Profile</Link>
            <Link href="/map" className="hover:text-blue-600">Map</Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl space-y-4"
        >
          <input type="text" name="title" placeholder="Trip Title" value={trip.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="location" placeholder="Location / City / Country" value={trip.location} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="budget" placeholder="Budget" value={trip.budget} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="duration" placeholder="Duration" value={trip.duration} onChange={handleChange} className="w-full p-2 border rounded" />
          
          <select name="type" value={trip.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Trip Type</option>
            <option value="Solo">Solo</option>
            <option value="Couples">Couples</option>
            <option value="Friends">Friends</option>
            <option value="Family">Family</option>
          </select>

          <select name="activityType" value={trip.activityType} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Activity Type</option>
            <option value="Hiking">Hiking</option>
            <option value="Surf">Surf</option>
            <option value="Beach">Beach</option>
            <option value="Skiing">Skiing</option>
            <option value="Relax">Relax</option>
            <option value="Culture">Culture</option>
          </select>

          <input type="text" name="transport" placeholder="Transport" value={trip.transport} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="image" placeholder="Image URL" value={trip.image} onChange={handleChange} className="w-full p-2 border rounded" />

          <div className="space-y-2">
            <h3 className="font-bold">Itinerary</h3>
            {trip.details.map((d, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span>Day {d.day}:</span>
                <input type="text" value={d.activity} onChange={(e) => handleDetailChange(idx, e.target.value)} className="flex-1 p-2 border rounded" required />
              </div>
            ))}
            <button type="button" onClick={addDay} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Add Day</button>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Create Trip</button>
        </form>
      </main>
    </div>
  );
}

