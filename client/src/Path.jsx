// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Progress from './pages/Progress'
import ToDo from './pages/ToDo'
import Notes from './pages/Notes'
import Pomodoro from './pages/Pomodoro'
import Profile from './pages/Profile'

function Path() {

  

  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Progress active='progress' />} />
                <Route path='/todo' element={<ToDo active='todo' />} />
                <Route path='/notes' element={<Notes active='notes' />} />
                <Route path='/pomodoro' element={<Pomodoro active='pomodoro' />} />
                <Route path='/profile' element={<Profile active='profile' />} />
            </Routes>
        </Router>
    </>
  )
}

export default Path