// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Progress from './pages/Progress'
import ToDo from './pages/ToDo'
import Notes from './pages/Notes'
import Pomodoro from './pages/Pomodoro'
import Profile from './pages/Profile'
import { useState } from 'react'

function Path() {

  const [isEnglish, setIsEnglish] = useState(true)  

  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Progress active='progress' isEnglish={isEnglish} setIsEnglish={setIsEnglish} />} />
                <Route path='/todo' element={<ToDo active='todo' isEnglish={isEnglish} setIsEnglish={setIsEnglish} />} />
                <Route path='/notes' element={<Notes active='notes' isEnglish={isEnglish} setIsEnglish={setIsEnglish} />} />
                <Route path='/pomodoro' element={<Pomodoro active='pomodoro' isEnglish={isEnglish} setIsEnglish={setIsEnglish} />} />
                <Route path='/profile' element={<Profile active='profile' isEnglish={isEnglish} setIsEnglish={setIsEnglish} />} />
            </Routes>
        </Router>
    </>
  )
}

export default Path