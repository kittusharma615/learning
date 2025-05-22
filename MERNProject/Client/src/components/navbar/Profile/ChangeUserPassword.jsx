import React, { useState } from 'react';
import { useAuth } from '../../context/auth_context';
import { 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaKey,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../react-toastify/Notification';
import {validationChangePasswordSchema} from './Validation'

export default function ChangeUserPassword() {
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState({ 
    currentPassword: false, 
    newPassword: false, 
    confirmPassword: false 
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    return strength;
  };

  const formik = useFormik({
    initialValues: { 
      currentPassword: '', 
      newPassword: '', 
      confirmPassword: '' 
    },
    validationSchema: validationChangePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        
        const id = localStorage.getItem('User_id');
              const token = localStorage.getItem('User_token');
        
              const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/changePassword/${id}`,
                {
                  headers: { 'x-api-key': token }
                }
              );
              console.log(response)
              if (response.status === 200) {
        
        showSuccessToast('Password changed successfully!');
        // resetForm();
              }
      } catch (err) {
        showErrorToast(err.response?.data?.message || 'Failed to change password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNewPasswordChange = (e) => {
    formik.handleChange(e);
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  const inputFields = [
    { 
      label: 'Current Password', 
      name: 'currentPassword', 
      autoComplete: 'current-password', 
      placeholder: 'Enter current password',
      icon: <FaLock className="h-4 w-4" />
    },
    { 
      label: 'New Password', 
      name: 'newPassword', 
      autoComplete: 'new-password', 
      placeholder: 'Enter new password',
      icon: <FaKey className="h-4 w-4" />
    },
    { 
      label: 'Confirm Password', 
      name: 'confirmPassword', 
      autoComplete: 'new-password', 
      placeholder: 'Re-enter new password',
      icon: <FaKey className="h-4 w-4" />
    },
  ];

  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ];

  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Moderate',
    'Strong',
    'Very Strong'
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto  border border-gray-100">
      <div className="text-center mb-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
          <FaLock className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">Change Password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Ensure your account is secure with a strong, unique password.
        </p>
      </div>

      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        {inputFields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                {field.icon}
              </div>

              <input
                id={field.name}
                name={field.name}
                type={showPassword[field.name] ? 'text' : 'password'}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                onChange={field.name === 'newPassword' ? handleNewPasswordChange : formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`block w-full pl-10 pr-10 py-2 border ${
                  formik.touched[field.name] && formik.errors[field.name] 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } rounded-md shadow-sm focus:outline-none sm:text-sm`}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility(field.name)}
                aria-label={showPassword[field.name] ? 'Hide password' : 'Show password'}
              >
                {showPassword[field.name] ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {formik.touched[field.name] && formik.errors[field.name] ? (
              <p className="mt-2 flex items-center text-sm text-red-600">
                <FaExclamationTriangle className="mr-1.5 h-4 w-4 flex-shrink-0" />
                {formik.errors[field.name]}
              </p>
            ) : null}

            {field.name === 'newPassword' && formik.values.newPassword && (
              <div className="mt-2">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-medium text-gray-500">
                    Password strength: {strengthLabels[passwordStrength - 1] || 'None'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${strengthColors[passwordStrength - 1] || 'bg-gray-200'}`} 
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <ul className="mt-2 text-xs text-gray-500 space-y-1">
                  <li className={`flex items-center ${formik.values.newPassword.length >= 8 ? 'text-green-600' : ''}`}>
                    {formik.values.newPassword.length >= 8 ? (
                      <FaCheckCircle className="mr-1.5 h-3 w-3 flex-shrink-0" />
                    ) : null}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${/[a-z]/.test(formik.values.newPassword) ? 'text-green-600' : ''}`}>
                    {/[a-z]/.test(formik.values.newPassword) ? (
                      <FaCheckCircle className="mr-1.5 h-3 w-3 flex-shrink-0" />
                    ) : null}
                    At least one lowercase letter
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(formik.values.newPassword) ? 'text-green-600' : ''}`}>
                    {/[A-Z]/.test(formik.values.newPassword) ? (
                      <FaCheckCircle className="mr-1.5 h-3 w-3 flex-shrink-0" />
                    ) : null}
                    At least one uppercase letter
                  </li>
                  <li className={`flex items-center ${/[0-9]/.test(formik.values.newPassword) ? 'text-green-600' : ''}`}>
                    {/[0-9]/.test(formik.values.newPassword) ? (
                      <FaCheckCircle className="mr-1.5 h-3 w-3 flex-shrink-0" />
                    ) : null}
                    At least one number
                  </li>
                  <li className={`flex items-center ${/[!@#$%^&*]/.test(formik.values.newPassword) ? 'text-green-600' : ''}`}>
                    {/[!@#$%^&*]/.test(formik.values.newPassword) ? (
                      <FaCheckCircle className="mr-1.5 h-3 w-3 flex-shrink-0" />
                    ) : null}
                    At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              formik.isSubmitting || !formik.isValid
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
          >
            {formik.isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}