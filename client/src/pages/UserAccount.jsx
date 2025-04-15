import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const UserAccount = () => {
  const { navigate, axios, user } = useAppContext();
  const [userInfo, setUserInfo] = useState({ name: '', email: '', addresses: [] });
  const [loading, setLoading] = useState(true);

  // Fetch user account details
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get('/api/user/details', {
          withCredentials: true,
        });
        if (data.success) {
          setUserInfo({
            name: data.user.name || 'User',
            email: data.user.email || '',
            addresses: data.user.addresses || [],
          });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Failed to load account details');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [axios]);

  // Placeholder for adding a new address (assumes future API endpoint)
  const handleAddAddress = () => {
    toast('Address management coming soon!', { icon: 'ℹ️' });
    // Future implementation: navigate('/account/address/add');
  };

  // Placeholder for editing an address
  const handleEditAddress = (index) => {
    toast('Address editing coming soon!', { icon: 'ℹ️' });
    // Future implementation: navigate(`/account/address/edit/${index}`);
  };

  // Placeholder for deleting an address
  const handleDeleteAddress = async (index) => {
    try {
      const updatedAddresses = userInfo.addresses.filter((_, i) => i !== index);
      const { data } = await axios.post(
        '/api/user/update',
        { addresses: updatedAddresses },
        { withCredentials: true }
      );
      if (data.success) {
        setUserInfo((prev) => ({ ...prev, addresses: updatedAddresses }));
        toast.success('Address deleted');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
            My Account
          </h1>
          <p className="text-gray-500 text-center mb-12">
            Manage your account details and addresses on{' '}
            <span className="text-primary">GroceryGo</span>.
          </p>

          {/* Account Information */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <p className="mt-1 text-gray-900">{userInfo.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{userInfo.email}</p>
              </div>
              <button
                onClick={() => navigate('/account/edit')}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dull transition"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Saved Addresses
              </h2>
              <button
                onClick={handleAddAddress}
                className="text-primary hover:underline text-sm"
              >
                Add New Address
              </button>
            </div>
            {userInfo.addresses.length === 0 ? (
              <p className="text-gray-500 text-center">
                No saved addresses yet. Add one to make checkout faster!
              </p>
            ) : (
              <div className="space-y-4">
                {userInfo.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <p className="text-gray-900 font-medium">
                        {address.name || 'Address ' + (index + 1)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {address.street}, {address.city}, {address.state} -{' '}
                        {address.zip}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {address.phone || 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAddress(index)}
                        className="text-primary hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;