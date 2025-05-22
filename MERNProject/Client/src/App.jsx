import React from 'react'
import {Navbar,Home,Man,Women,Kid,Beauty,Login,Signup,Profile,Setting,OtpVerification} from './AllComponents';

import {BrowserRouter,Route,Routes} from 'react-router-dom'

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
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/setting' element={<Setting/>}/>
      <Route path='/otpverification/:type/:id' element={<OtpVerification/>}/>
    </Routes>
    </BrowserRouter>
  )
}
