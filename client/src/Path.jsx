// import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Progress from './pages/Progress'
import ToDo from './pages/ToDo'
import Notes from './pages/Notes'
import Pomodoro from './pages/Pomodoro'
import Profile from './pages/Profile'
import { useEffect, useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import ImageSelect from './pages/ImageSelect'

import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

function Path() {

  const [isEnglish, setIsEnglish] = useState(true)
  const [isBlack, setIsBlack] = useState(false)
  const [switchStyle, setSwitchStyle] = useState({})  
  const [regData, setRegData] = useState({
    user: null,
    pass: null,
    repPass: null,
    email: null
  })
  const [logData, setLogData] = useState({
    email: null,
    pass: null,
  })

  useEffect(() => {
    isBlack ? document.body.classList.add('bodyScroll') : document.body.classList.remove('bodyScroll')
  }, [isBlack])

  return (
    <>
        <Router>
            <Routes>
                
              <Route path='/signin' element={<Login
                logData={logData}
                setLogData={setLogData}              
                />}>
              </Route>
              <Route path='/signup' element={<Register
                regData={regData}
                setRegData={setRegData}
                />}>
              </Route>
              <Route path='/signup/imageselect/:id' element={<ImageSelect
                
                />}>
              </Route>
              <Route element={<AuthOutlet fallbackPath='/signin' />}>
                <Route path='/' element={<Navigate to='/progress' />} />
                <Route path='/progress' element={
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
              </Route>
            </Routes>
        </Router>
    </>
  )
}

export default Path