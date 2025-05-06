import React from "react";
import left_cover from "../assets/cover_image.jpg";

const LoginPage = () => {
    return (
        <div className="w-full h-screen flex md:flex-row flex-col">
            <div className="relative md:w-1/2 w-full h-full ">
                <img src={left_cover} className="w-full h-full object-cover" alt="Cover" />
                <div className="absolute top-[20%] left-[10%] text-white">
                    <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
                    <p className="text-lg">Start for free and get attractive offers from the community</p>
                </div>
            </div>

            <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center bg-white">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-2/3 mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-2/3 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <div className="flex items-center justify-between">
                    <div className="w-full flex items-center">
                        <input type="checkbox" className="w-4 h-4 mr-2" />
                        <p className="text-sm">Remember me for 30 days</p>
                    </div>
                </div> */}
                <br />
                <button className="w-2/3 px-4 py-2 black bg-black text-white rounded-md hover:bg-blue-700">
                    Login
                </button>
                <br />

                <button className="w-2/3 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700">
                    Register
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
