import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import left_cover from "../../assets/left_cover.jpg";
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object({
    name: Yup.string().matches(/^[A-Za-z\s]+$/, "Invalid Name").required("Name is required"),
    email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email").email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "Invalid Password").min(6, "Minimum 6 characters").required("Password is required"),
  });

  const registerFields = [
    { name: "name", placeholder: "Enter Your Name", type: "text" },
    { name: "email", placeholder: "Enter Your Email", type: "email" },
    { name: "password", placeholder: "Enter Your Password", type: "password" },
  ];

  const handleRegisterSubmit = async(values) => {
    
    try{
      const response = await axios.post('http://localhost:8080/createUser',values)
      
      if(response.status ==200 || response.status==201){
        alert(response.data.msg)
        navigate(`/otpverification/userOtp/${response.data.data.id}`)
      }
     
    }
    catch(e){
      alert(e.response.data?.msg|| 'Network Error')
    }
  };

  return (
    <div className="w-full h-screen flex md:flex-row flex-col">
      {/* Left Side */}
      <div className="relative md:w-1/2 w-full h-full">
        <img src={left_cover} className="w-full h-full object-cover" alt="Cover" />
        <div className="absolute top-[20%] left-[10%] text-white">
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
          <p className="text-lg">Start for free and get attractive offers from the community</p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center bg-white">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={handleRegisterSubmit}
        >
          <Form className="w-full flex flex-col items-center">
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
              className="w-2/3 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
