// client/src/components/EditProfile.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // Adjust path
import toast from 'react-hot-toast';

const EditProfile = () => {
  const { axios, user, setUser, navigate } = useAppContext();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!form.name || !form.email) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.put('/api/user/update', form);
      if (data.success) {
        setUser(data.user); // Update user in AppContext
        toast.success('Profile updated successfully!');
        navigate('/account'); // Redirect back to My Account
      } else {
        setError(data.message || 'Failed to update profile.');
        toast.error(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError('Error updating profile. Please try again.');
      toast.error('Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Edit Profile
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded"
              placeholder="Your Email"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dull transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/account')}
              className="flex-1 bg-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;