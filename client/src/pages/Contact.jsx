import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // Adjust path to your AppContext.jsx
import toast from 'react-hot-toast'; // Optional, for user feedback

const Contact = () => {
  // Initialize form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Get Axios instance from AppContext
  const { axios: api } = useAppContext(); // Use 'axios' or 'api' depending on your context

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await api.post('/contact', form); // Use Axios with baseURL
      const result = response.data;

      if (result.success) {
        setSubmitted(true);
        setError('');
        setForm({ name: '', email: '', subject: '', message: '' }); // Clear form
        toast.success('Message sent successfully!');
      } else {
        setError(result.error || 'Something went wrong.');
        toast.error(result.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Contact Us</h2>

      {submitted && (
        <div className="mb-4 bg-green-100 text-green-800 p-4 rounded">
          Message sent! We'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;