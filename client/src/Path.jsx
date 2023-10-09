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
  const [isBlack, setIsBlack] = useState(false)
  const [switchStyle, setSwitchStyle] = useState({})  

  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={
                  <Progress
                   active='progress'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}/>
                } />
                <Route path='/todo' element={
                  <ToDo
                   active='todo'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}/>
                } />
                <Route path='/notes' element={
                  <Notes
                   active='notes'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle} />
                } />
                <Route path='/pomodoro' element={
                  <Pomodoro
                   active='pomodoro'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}/>
                } />
                <Route path='/profile' element={
                  <Profile
                   active='profile'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}/>
                } />
            </Routes>
        </Router>
    </>
  )
}

export default Path