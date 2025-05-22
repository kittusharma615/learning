import React, { useRef, useState } from 'react';
import axios from "axios";
import { useAuth } from '../../context/auth_context';
import { Formik, Form, ErrorMessage } from 'formik';
import { validationSchema } from './Validation';
import { LuPencil } from 'react-icons/lu';
import { showErrorToast, showSuccessToast } from '../../react-toastify/Notification';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from './motion';

export default function Profile() {
  const { userData, setUserData } = useAuth();
  const [preview, setPreview] = useState(userData.profileImg?.secure_url || '');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const initialValues = {
    profileImg: null,
  };

  const handleSubmit = async (values) => {
    const file = values.profileImg;
    if (!file) return;
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('profileImg', file);

    try {
      const id = localStorage.getItem('User_id');
      const token = localStorage.getItem('User_token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/updateProfile/${id}`,
        formData,
        { headers: { 'x-api-key': token } }
      );

      if (response.status === 200) {
        setUserData(response.data.data);
        showSuccessToast('Profile image updated successfully');
      }

      const result = response.data;
      if (result.profileImg?.secure_url) {
        setPreview(result.profileImg.secure_url);
      }
    } catch (err) {
      showErrorToast(err.response?.data?.msg || "Network Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex flex-col items-center">
        {/* Profile Image + Edit Button */}
        <motion.div 
          variants={zoomIn(0.2, 1)}
          className="relative group w-36 h-36 mb-6 rounded-full border-4 border-gray-200 overflow-hidden shadow-lg hover:border-blue-400 transition-all duration-300"
        >
          {preview ? (
            <motion.img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          ) : (
            <motion.div 
              className="w-full h-full flex items-center justify-center text-5xl font-semibold text-gray-500 bg-gradient-to-br from-gray-100 to-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              {userData.name?.charAt(0).toUpperCase() || 'U'}
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-2 right-2 bg-blue-600 p-2.5 rounded-full shadow-xl hover:bg-blue-700"
            title="Edit Profile Picture"
            disabled={isLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <LuPencil className="w-4 h-4 text-white" />
          </motion.button>
          
          {/* Loading overlay */}
          {isLoading && (
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Name & Email */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            {userData.name || 'User'}
          </h1>
          <p className="text-gray-500 mt-2">{userData.email}</p>
        </motion.div>

        {/* Upload Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isValid, dirty }) => (
            <Form className="mt-2 w-full max-w-sm">
              <input
                type="file"
                name="profileImg"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue('profileImg', file);

                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                disabled={isLoading}
              />
              <ErrorMessage
                name="profileImg"
                component="div"
                className="text-red-500 text-sm mt-1 text-center"
              />
              <motion.button
                type="submit"
                className={`mt-6 w-full py-3 rounded-xl transition flex items-center justify-center ${
                  (!dirty || !isValid || isLoading) 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg'
                } text-white font-medium`}
                disabled={!dirty || !isValid || isLoading}
                whileHover={(!dirty || !isValid || isLoading) ? {} : { scale: 1.02 }}
                whileTap={(!dirty || !isValid || isLoading) ? {} : { scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.span
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    Uploading...
                  </>
                ) : (
                  'Update Image'
                )}
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Divider */}
      <motion.div 
        variants={fadeIn('up', 'tween', 0.4, 1)}
        className="mt-10 pt-6 border-t border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Account Information
        </h3>
        <p className="text-gray-600">
          Member since: {new Date(userData.joinDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) || 'N/A'}
        </p>
      </motion.div>
    </motion.div>
  );
}