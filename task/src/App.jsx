import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table1 from './user'
import Edit from './edit';


function App() {


  return (
   <div>
    
   
    <Router>
    
      <Routes>
      <Route  exact path="/" element={<Table1 />}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      
      </Routes>
      </Router>
 
  
   </div>
  )
}

export default App
