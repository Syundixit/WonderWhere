"use client";

import Link from "next/link";
import React from "react";

export default function Profile() {
  // Example user data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    tripsCompleted: 5,
    favoriteDestinations: ["Paris", "Bali", "Thailand"],
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

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-12">
        <h2 className="text-5xl font-extrabold mb-6">Your Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-left">
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>Trips Completed:</strong> {user.tripsCompleted}</p>
          <p className="mb-2"><strong>Favorite Destinations:</strong> {user.favoriteDestinations.join(", ")}</p>
        </div>

        <Link href="/" className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
          Back to Home
        </Link>
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
