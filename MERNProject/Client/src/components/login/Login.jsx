import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import left_cover from "../../assets/left_cover.jpg";
import axios from 'axios';
import {useAuth} from '../context/auth_context'
import {loginSchema} from './Validation'
import {showSuccessToast,showErrorToast} from '../react-toastify/Notification'

export default function Login() {

    const loginFields = [
      { name: "email", placeholder: "Enter Your Email", type: "email" },
      { name: "password", placeholder: "Enter Your Password", type: "password" },
    ];

    const {setIsLoggedIn,setUserData} = useAuth()

    const handleLoginSubmit = async(values) => {
    
      try{
        const response = await axios.post('http://localhost:8080/LogInUser',values)
        
        if(response.status ==200 || response.status==201){
          
          localStorage.setItem('User_token',response.data.token)
          localStorage.setItem('User_id',response.data.id)
          setUserData(response.data.data)
          setIsLoggedIn(true)
          showSuccessToast('Sucessfully LogIn')
        }
       
      }
      catch(e){
        showErrorToast(e.response.data?.msg|| 'Network Error')
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
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLoginSubmit}
        >
          <Form className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Login</h2>

            {loginFields.map(({ name, placeholder, type }) => (
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
    </div>  )
}
