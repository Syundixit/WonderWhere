"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// Sample itineraries with keywords
const mockItineraries = [
  {
    id: 1,
    title: "7 Days in Switzerland",
    location: "Switzerland",
    budget: "$2000",
    duration: "7 days",
    type: "Solo",
    activityType: "Skiing",
    transport: "Train, Bus",
    image: "/switzerland.jpg",
    details: [
      { day: 1, activity: "Arrive in Zurich, explore city" },
      { day: 2, activity: "Train to Interlaken, check into hotel" },
      { day: 3, activity: "Ski in Jungfrau region" },
      { day: 4, activity: "Ski and explore mountain villages" },
    ],
    keywords: ["Europe", "Switzerland", "Zurich", "Interlaken", "Skiing", "Mountains"],
  },
  {
    id: 2,
    title: "Romantic Paris Getaway",
    location: "Paris, France",
    budget: "$2500",
    duration: "5 days",
    type: "Couples",
    activityType: "Relax",
    transport: "Metro, Walking",
    image: "/paris.jpg",
    details: [
      { day: 1, activity: "Visit Eiffel Tower" },
      { day: 2, activity: "Louvre Museum tour" },
      { day: 3, activity: "Seine River cruise" },
      { day: 4, activity: "Montmartre & local cafes" },
    ],
    keywords: ["Europe", "France", "Paris", "Romantic", "Culture", "Relax"],
  },
  {
    id: 3,
    title: "Adventure in Costa Rica",
    location: "Costa Rica",
    budget: "$1800",
    duration: "6 days",
    type: "Friends",
    activityType: "Hiking",
    transport: "Bus, Rental Car",
    image: "/costarica.jpg",
    details: [
      { day: 1, activity: "Arrive in San Jose" },
      { day: 2, activity: "Hike Arenal Volcano" },
      { day: 3, activity: "Zip-lining and waterfall tour" },
      { day: 4, activity: "Beach time in Manuel Antonio" },
    ],
    keywords: ["Central America", "Costa Rica", "Adventure", "Hiking", "Beach"],
  },
  {
    id: 4,
    title: "Tokyo City Highlights",
    location: "Tokyo, Japan",
    budget: "$2200",
    duration: "7 days",
    type: "Solo",
    activityType: "Culture",
    transport: "Train, Metro",
    image: "/tokyo.jpg",
    details: [
      { day: 1, activity: "Shibuya crossing & explore local streets" },
      { day: 2, activity: "Visit Asakusa and Sensoji Temple" },
      { day: 3, activity: "Day trip to Mount Fuji" },
      { day: 4, activity: "Shopping in Harajuku & Shinjuku" },
    ],
    keywords: ["Asia", "Japan", "Tokyo", "Culture", "City", "Temples"],
  },
  {
    id: 5,
    title: "Maldives Relaxing Escape",
    location: "Maldives",
    budget: "$4000",
    duration: "5 days",
    type: "Couples",
    activityType: "Beach",
    transport: "Boat, Seaplane",
    image: "/maldives.jpg",
    details: [
      { day: 1, activity: "Arrive and settle into overwater villa" },
      { day: 2, activity: "Snorkeling and water sports" },
      { day: 3, activity: "Private beach dinner" },
      { day: 4, activity: "Spa and relaxation day" },
    ],
    keywords: ["Asia", "Maldives", "Beach", "Relax", "Couples", "Luxury"],
  },
  {
    id: 6,
    title: "New Zealand Adventure",
    location: "New Zealand",
    budget: "$3000",
    duration: "10 days",
    type: "Friends",
    activityType: "Hiking",
    transport: "Car, Ferry",
    image: "/newzealand.jpg",
    details: [
      { day: 1, activity: "Arrive in Auckland" },
      { day: 2, activity: "Drive to Rotorua, visit geysers" },
      { day: 3, activity: "Hike in Tongariro National Park" },
      { day: 4, activity: "Queenstown adventure sports" },
    ],
    keywords: ["Oceania", "New Zealand", "Hiking", "Adventure", "Nature"],
  },
  {
    id: 7,
    title: "Safari in Kenya",
    location: "Kenya",
    budget: "$3500",
    duration: "7 days",
    type: "Family",
    activityType: "Adventure",
    transport: "Jeep, Plane",
    image: "/kenya.jpg",
    details: [
      { day: 1, activity: "Arrive in Nairobi, visit Nairobi National Park" },
      { day: 2, activity: "Fly to Maasai Mara, afternoon safari" },
      { day: 3, activity: "Full day safari in Maasai Mara" },
      { day: 4, activity: "Visit local Maasai village" },
    ],
    keywords: ["Africa", "Kenya", "Safari", "Adventure", "Wildlife", "Family"],
  },
  {
    id: 8,
    title: "Sydney & Surrounds",
    location: "Sydney, Australia",
    budget: "$2800",
    duration: "6 days",
    type: "Solo",
    activityType: "Culture",
    transport: "Train, Ferry",
    image: "/sydney.jpg",
    details: [
      { day: 1, activity: "Opera House tour & Circular Quay" },
      { day: 2, activity: "Bondi Beach walk & coastal hike" },
      { day: 3, activity: "Day trip to Blue Mountains" },
      { day: 4, activity: "Explore Darling Harbour" },
    ],
    keywords: ["Oceania", "Australia", "Sydney", "Culture", "City", "Beach"],
  },
  {
    id: 9,
    title: "Iceland Northern Lights",
    location: "Iceland",
    budget: "$3200",
    duration: "7 days",
    type: "Couples",
    activityType: "Relax",
    transport: "Car",
    image: "/iceland.jpg",
    details: [
      { day: 1, activity: "Arrive in Reykjavik, explore city" },
      { day: 2, activity: "Golden Circle tour" },
      { day: 3, activity: "Visit Blue Lagoon" },
      { day: 4, activity: "Northern Lights evening tour" },
    ],
    keywords: ["Europe", "Iceland", "Nature", "Northern Lights", "Relax", "Couples"],
  },
  {
    id: 10,
    title: "Hiking in Patagonia",
    location: "Patagonia, Chile",
    budget: "$3500",
    duration: "8 days",
    type: "Friends",
    activityType: "Hiking",
    transport: "Bus, Car",
    image: "/patagonia.jpg",
    details: [
      { day: 1, activity: "Arrive in Punta Arenas" },
      { day: 2, activity: "Torres del Paine National Park trek" },
      { day: 3, activity: "Glacier hiking and photography" },
      { day: 4, activity: "Explore local villages" },
    ],
    keywords: ["South America", "Chile", "Hiking", "Adventure", "Nature", "Friends"],
  },
  {
    id: 11,
    title: "Barcelona City & Beach",
    location: "Barcelona, Spain",
    budget: "$2000",
    duration: "6 days",
    type: "Couples",
    activityType: "Beach",
    transport: "Metro, Walking",
    image: "/barcelona.jpg",
    details: [
      { day: 1, activity: "Explore Gothic Quarter" },
      { day: 2, activity: "Sagrada Familia & Park Guell" },
      { day: 3, activity: "Beach day at Barceloneta" },
      { day: 4, activity: "Tapas tour & nightlife" },
    ],
    keywords: ["Europe", "Spain", "Barcelona", "Beach", "Culture", "Couples"],
  },
  {
    id: 12,
    title: "Alaskan Cruise Adventure",
    location: "Alaska, USA",
    budget: "$4000",
    duration: "10 days",
    type: "Family",
    activityType: "Adventure",
    transport: "Ship, Plane",
    image: "/alaska.jpg",
    details: [
      { day: 1, activity: "Depart from Seattle, onboard activities" },
      { day: 2, activity: "Sailing along Inside Passage" },
      { day: 3, activity: "Glacier Bay National Park tour" },
      { day: 4, activity: "Shore excursion in Juneau" },
    ],
    keywords: ["North America", "USA", "Alaska", "Adventure", "Cruise", "Family"],
  },
];

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    budget: "",
    duration: "",
    type: "",
    activityType: "",
  });

  const [results, setResults] = useState([]);
  const [userTrips, setUserTrips] = useState([]);

  // Load user trips from localStorage
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("userTrips")) || [];
    setUserTrips(storedTrips);
    setResults([...mockItineraries, ...storedTrips]);
  }, []);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const searchTerm = searchParams.location.toLowerCase().trim();

    const filtered = [...mockItineraries, ...userTrips].filter((trip) => {
      const matchesKeywords = searchTerm
        ? trip.keywords?.some((kw) => kw.toLowerCase().includes(searchTerm))
        : true;
      const matchesType = searchParams.type ? trip.type === searchParams.type : true;
      const matchesActivity = searchParams.activityType
        ? trip.activityType === searchParams.activityType
        : true;

      return matchesKeywords && matchesType && matchesActivity;
    });

    setResults(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-black">WonderWhere</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/create-your-trip" className="hover:text-blue-600">Create Your Own Trip</Link>
            <Link href="/profile" className="hover:text-blue-600">Profile</Link>
            <Link href="/map" className="hover:text-blue-600">Map</Link>
          </nav>
        </div>
      </header>

      {/* Hero & Search */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-12">
        <h2 className="text-5xl font-extrabold mb-6">Plan Your Perfect Trip</h2>
        <p className="text-lg max-w-xl mb-8">
          Explore real itineraries from other travelers and replicate trips you love.
        </p>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              name="location"
              placeholder="Search by Location / Country / City"
              value={searchParams.location}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="budget"
              placeholder="Budget"
              value={searchParams.budget}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={searchParams.duration}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <select
              name="type"
              value={searchParams.type}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Trip Type</option>
              <option value="Solo">Solo</option>
              <option value="Couples">Couples</option>
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
            </select>
            <select
              name="activityType"
              value={searchParams.activityType}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Activity Type</option>
              <option value="Hiking">Hiking</option>
              <option value="Surf">Surf</option>
              <option value="Beach">Beach</option>
              <option value="Skiing">Skiing</option>
              <option value="Relax">Relax</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Search Trips
          </button>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {results.length === 0 && <p className="text-gray-500">No trips found. Try a different search.</p>}
          {results.map((trip, index) => (
            <div key={trip.id || index} className="bg-white p-6 rounded-lg shadow-md text-black">
              {trip.image && (
                <div className="mb-4">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
              <p className="mb-1"><strong>Location:</strong> {trip.location}</p>
              <p className="mb-1"><strong>Budget:</strong> {trip.budget}</p>
              <p className="mb-1"><strong>Duration:</strong> {trip.duration}</p>
              <p className="mb-1"><strong>Trip Type:</strong> {trip.type}</p>
              <p className="mb-2"><strong>Activity:</strong> {trip.activityType}</p>
              <div className="mb-2">
                <strong>Itinerary:</strong>
                <ul className="list-disc list-inside">
                  {trip.details?.map((d) => (
                    <li key={d.day}>Day {d.day}: {d.activity}</li>
                  ))}
                </ul>
              </div>
              <p className="mb-2"><strong>Transport:</strong> {trip.transport}</p>
              <button className="mt-2 bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 transition">
                Do This Trip
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <div className="container mx-auto text-center py-6 px-6 text-gray-600">
          &copy; {new Date().getFullYear()} WonderWhere. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
