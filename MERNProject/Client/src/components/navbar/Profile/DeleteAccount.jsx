import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { showSuccessToast, showErrorToast } from '../../react-toastify/Notification';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/auth_context'

export default function DeleteAccount() {

  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate()

  const {setUserData} = useAuth()

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const id = localStorage.getItem('User_id');
      const token = localStorage.getItem('User_token');

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/DeleteUser/${id}`,
        {
          headers: { 'x-api-key': token }
        }
      );
      console.log(response)
      if (response.status === 200) {
        setUserData({});
        showSuccessToast('Your Account Deleted successfully');
        navigate('/')
      }

      
    } catch (err) {
      console.log(err?.response)
      showErrorToast(err.response?.data?.msg || "Network Error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-center text-xl font-bold text-gray-900">Delete Account</h2>
      <p className="text-center text-gray-600 mt-2">
        Deleting your account is irreversible. All your data will be lost.
      </p>

      <button
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="w-full mt-4 py-2 px-4 border border-red-600 text-red-600 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-red-100 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        {isDeleting ? 'Deleting...' : (
          <>
            <FaTrash className="inline-block mr-2" /> Delete My Account
          </>
        )}
      </button>
    </div>
  
  );
}