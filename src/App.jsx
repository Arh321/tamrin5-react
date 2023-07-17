import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Addcontact } from './pages/AddContact';
import { Contact } from './pages/Contact';
import {  EditeForm } from './pages/EditeForm';
import { Home } from './pages/Home'

function App() {
  

  return (
   <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addcontact' element={<Addcontact/>}/>
      <Route path='/addcontact/:id' element={<Contact/>}/>
      <Route path='/editcontact/:id' element={<EditeForm/>}/>
    </Routes>
   </div>
  )
}

export default App
