"use client";
import Image from "next/image";
import BookingForm from "./components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-50">
      {/* Logo or branding - optional */}
      <header className="mb-8">
        <Image
          src="/airplane.png"   // replace with your actual logo or remove if not needed
          alt="Travel Booking Logo"
          width={150}
          height={40}
          priority
        />
      </header>

      {/* Main booking form */}
      <main className="w-full max-w-4xl">
       <BookingForm/>
      </main>

      {/* Footer - optional, can add company name or copyright */}
      <footer className="mt-8 text-xs text-gray-500">
        © 2025 NVAG Business Solutions. All rights reserved.
      </footer>
    </div>
  );
}
