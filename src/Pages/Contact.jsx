import React, { useState } from "react";
import '../App.css';
import Footer from "../Components/Footer.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" });

  const submit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white px-4">
      <div className="w-full max-w-xl rounded-3xl shadow-2xl border border-amber-200 bg-white p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-amber-500 mb-2">
          Feedback
        </h2>
        <p className="text-center text-gray-500 mb-8">
          We’d love to hear your thoughts
        </p>

        <form onSubmit={submit} className="space-y-6">
          {/* Name */}
          <div className="group">
            <label className="block mb-1 font-medium text-gray-700 group-focus-within:text-amber-500 transition-colors">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div className="group">
            <label className="block mb-1 font-medium text-gray-700 group-focus-within:text-amber-500 transition-colors">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Feedback */}
          <div className="group">
            <label className="block mb-1 font-medium text-gray-700 group-focus-within:text-amber-500 transition-colors">
              Feedback
            </label>
            <textarea
              rows="4"
              placeholder="Share your feedback"
              value={form.feedback}
              onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-400 text-white font-semibold shadow-lg hover:bg-amber-500 hover:shadow-amber-300 transition-all duration-300 active:scale-95"
          >
            Submit Feedback
          </button>
        </form>
      </div>
       
    </section>
    <Footer />
    </>
  );
 
}

/* Tailwind animation helper (add to global css)
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
*/