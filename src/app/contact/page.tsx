"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import ContactLayout from "../components/ContactLayout";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <ContactLayout>
      <div className="max-w-5xl w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 pb-2">Guillermo Basterra</h1>
          <a
            href="mailto:guillebasterra@gmail.com"
            className="text-lg text-red-600 hover:underline"
          >
            guillebasterra@gmail.com
          </a>
          <p className="text-lg text-gray-700">+1 347 571-3280</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:ring focus:ring-gray-200"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Send Message
          </button>
          <p className="text-gray-600 mt-2">{status}</p>
        </form>
      </div>
    </ContactLayout>
  );
}
