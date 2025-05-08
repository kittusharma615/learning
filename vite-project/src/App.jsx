import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/Login'
import OtpPage from './components/otp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/otp" element={<OtpPage />} />
    </Routes>
  )
}

export default App
