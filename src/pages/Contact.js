import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="block w-full p-2 border rounded mb-2"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="block w-full p-2 border rounded mb-2"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Your Message"
          className="block w-full p-2 border rounded mb-2"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          rows="4"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
