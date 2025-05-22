import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import left_cover from "../../assets/left_cover.jpg";
import { showSuccessToast, showErrorToast } from "../react-toastify/Notification";

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const registerSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters and include an uppercase letter, a number, and a special character"
      )
      .required("Password is required"),
    profileImg: Yup.mixed().nullable(),
  });

  const registerFields = [
    { name: "name", placeholder: "Enter Your Name", type: "text" },
    { name: "email", placeholder: "Enter Your Email", type: "email" },
    { name: "password", placeholder: "Enter Your Password", type: "password" },
  ];

  const handleRegisterSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.profileImg) {
        formData.append("profileImg", values.profileImg);
      }

      const response = await axios.post(`${API_URL}/createUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        showSuccessToast(response.data?.msg);
        localStorage.setItem("userEmail", response.data.data.email);
        navigate(`/otpverification/userOtp/${response.data.data.id}`);
      }
    } catch (e) {
      showErrorToast(e.response?.data?.msg || "Network Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex md:flex-row flex-col">
      <Formik
        initialValues={{ name: "", email: "", password: "", profileImg: null }}
        validationSchema={registerSchema}
        onSubmit={handleRegisterSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="w-full h-full flex md:flex-row flex-col">
            {/* Left Side - Cover + Profile Image Upload */}
            <div className="relative md:w-1/2 w-full h-full flex flex-col items-center justify-center bg-black text-white">
              <img
                src={left_cover}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
                alt="Cover"
              />

              <div className="z-10 text-center mb-6 px-4">
                <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
                <p className="text-lg">Start for free and get attractive offers from the community</p>
              </div>

              <div className="z-10 flex flex-col items-center">
                {/* Profile Image Preview */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-gray-200">
                  {values.profileImg ? (
                    <img
                      src={URL.createObjectURL(values.profileImg)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-white bg-gray-400">
                      ?
                    </div>
                  )}
                </div>

                {/* Profile Image Upload Input */}
                <input
                  id="profileImg"
                  name="profileImg"
                  type="file"
                  accept="image/*"
                  className="text-white mb-2"
                  onChange={(e) => {
                    setFieldValue("profileImg", e.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="profileImg"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Right Side - Form Fields */}
            <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center bg-white">
              <div className="w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">Register</h2>

                {registerFields.map(({ name, placeholder, type }) => (
                  <div key={name} className="w-2/3 mb-4">
                    <Field
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-2/3 px-4 py-2 text-white rounded-md ${
                    isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
