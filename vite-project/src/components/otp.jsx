import { useState } from 'react'

const OtpPage = () => {
  const [otp, setOtp] = useState('')

  const handleVerify = () => {
    // TODO: Call backend API to verify OTP
    alert(`Verifying OTP: ${otp}`)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 4-digit OTP"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  )
}

export default OtpPage;
