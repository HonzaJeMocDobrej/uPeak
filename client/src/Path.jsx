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
import LoadingPage from './components/LoadingPage'
import Validate from './pages/Validate'

function Path() {

  const [isEnglish, setIsEnglish] = useState()
  const [isBlack, setIsBlack] = useState()
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
  
  const [isNotificationRead, setIsNotificationRead] = useState([])
  const [verificationCode, setVerificationCode] = useState()

  useEffect(() => {
    const isBlackStorage = localStorage.getItem('isBlack')
    if (!isBlackStorage) return setIsBlack(false)
    setIsBlack(JSON.parse(isBlackStorage))
  }, [])

  useEffect(() => {
    const isEnglishStorage = localStorage.getItem('isEnglish')
    if (!isEnglishStorage) return setIsEnglish(true)
    setIsEnglish(JSON.parse(isEnglishStorage))
  }, [])

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
                setVerificationCode={setVerificationCode}
                />}>
              </Route>
              <Route path='/signup/validate' element={<Validate
                regData={regData}
                setRegData={setRegData}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
              />}>
              </Route>
              <Route element={<AuthOutlet fallbackPath='/signin' />}>
                <Route path='/signup/imageselect' element={<ImageSelect

                />}>
                </Route>
                <Route path='/' element={<Navigate to='/progress' />} />
                <Route path='/progress' element={
                  <Progress
                   active='progress'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}
                   setIsNotificationRead={setIsNotificationRead}
                   isNotificationRead={isNotificationRead}
                   />
                } />
                <Route path='/todo/:todoPageId' element={
                  <ToDo
                   active='todo'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}
                   setIsNotificationRead={setIsNotificationRead}
                   isNotificationRead={isNotificationRead}
                   />
                } />
                <Route path='/notes/:id' element={
                  <Notes
                   active='notes'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle} 
                   setIsNotificationRead={setIsNotificationRead}
                   isNotificationRead={isNotificationRead}
                   />
                } />
                <Route path='/pomodoro' element={
                  <Pomodoro
                   active='pomodoro'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}
                   setIsNotificationRead={setIsNotificationRead}
                   isNotificationRead={isNotificationRead}
                   />
                } />
                <Route path='/profile' element={
                  <Profile
                   active='profile'
                   isEnglish={isEnglish}
                   setIsEnglish={setIsEnglish}
                   isBlack={isBlack}
                   setIsBlack={setIsBlack}
                   switchStyle={switchStyle} 
                   setSwitchStyle={setSwitchStyle}
                   setIsNotificationRead={setIsNotificationRead}
                   isNotificationRead={isNotificationRead}
                   verificationCode={verificationCode}
                   setVerificationCode={setVerificationCode}
                   />
                } />
              </Route>

              <Route path='*' element={<LoadingPage />}>
              </Route>
            </Routes>
        </Router>
    </>
  )
}

export default Path