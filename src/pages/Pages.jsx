import React from 'react'
import Home from './Home'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom' 
import Cuisine from './Cuisine'
import Searched from './Searched'
import Recipe from './Recipe'
import { AnimatePresence } from 'framer-motion'

const Pages = () => {
  const location = useLocation();//for the animation
  return (
    <div className='Pages-Container'>
    <AnimatePresence mode ="wait">
    <Routes Location={location} key={location.pathname}> 
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cuisine/:type" element={<Cuisine></Cuisine>} />
        <Route path="/searched/:search" element={<Searched/>} />
        <Route path="/recipe/:name" element={<Recipe/>}/>
    </Routes> 
    </AnimatePresence>
    </div>
  )
}

export default Pages