import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Man from './components/men/Man'
import Women from './women/Women'
import Kid from './components/kid/Kid'
import Beauty from './components/beauty/Beauty'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import OtpVerification from './components/OtpVerification'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/men' element={<Man/>}/>
      <Route path='/women' element={<Women/>}/>
      <Route path='/kid' element={<Kid/>}/>
      <Route path='/beauty' element={<Beauty/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/otpverification/:type/:id' element={<OtpVerification/>}/>
    </Routes>
    </BrowserRouter>
  )
}
