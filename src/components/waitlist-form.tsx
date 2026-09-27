"use client";

import { useState } from "react";
import { db } from "../../firebaseConfig"; // Adjust path as needed
import { collection, addDoc } from "firebase/firestore";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "waitlist"), {
        email: email,
        timestamp: new Date(),
      });
      setEmail("");
      setMessage("Thanks for joining the waitlist!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Failed to join the waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center space-y-4">
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full max-w-md bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </button>
      {message && (
        <p className={`mt-4 text-sm ${message.includes("Thanks") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
