/* eslint-disable react/prop-types */
import trophyFill from '../assets/icons/trophyFill.svg'
import checkFillSvg from '../assets/icons/checkFill.svg'
import plusFillSvg from '../assets/icons/plusCircleFill.svg'
import clockFillSvg from '../assets/icons/clockFill.svg'
import userFillSvg from '../assets/icons/userCircleFill.svg'

import trophy from '../assets/icons/trophy.svg'
import checkSvg from '../assets/icons/check.svg'
import plusSvg from '../assets/icons/plusCircle.svg'
import clockSvg from '../assets/icons/clock.svg'
import userSvg from '../assets/icons/userCircle.svg'

import trophyWhiteSvg from '../assets/icons/trophyWhite.svg'
import checkWhiteSvg from '../assets/icons/checkWhite.svg'
import plusWhiteSvg from '../assets/icons/plusCircleWhite.svg'
import clockWhiteSvg from '../assets/icons/clockWhite.svg'
import userWhiteSvg from '../assets/icons/userCircleWhite.svg'

import honzak from '../assets/img/honzak.png'

import '../styles/styles.css'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'



function LeftMenu(props) {

    const {active, isEnglish, isBlack} = props

    const [height, setHeight] = useState(window.innerHeight)

    let navigate = useNavigate()

    const univNavigate = (path) => {
        navigate(path)
    }

    const selectedStyle = {
        'color': '#09F',
        'fontWeight': 700,
      }

      useEffect(() => {
        const handleResize = () => {
                // console.log(`changed, height: ${height}`);
                setHeight(window.innerHeight)
        }
          window.addEventListener('resize', handleResize)
        }, )

  return (
    <>
        <nav className={`lMenu ${isBlack ? 'lBlack' : null}`}>
            <div className="nameCont">
                <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
                <h1 className="shortHeading">u<span className='blackSpan'>P<div className="underline"></div></span></h1>
            </div>
            <ul style={height <= 650 ? {height: `${height / 10}%`} : null } className="itemsCont">
                <li onMouseUp={() => univNavigate('/progress')} className='selected'>
                    <img src={active ==='progress' ? trophyFill : (isBlack === true ? trophyWhiteSvg : trophy)} alt="" />
                    <p style={active === 'progress' ? selectedStyle : null}>{isEnglish ? 'Progress' : 'Progres'}</p>
                </li>
                <li onMouseUp={() => univNavigate('/todo')}>
                    <img src={active === 'todo' ? checkFillSvg : (isBlack === true ? checkWhiteSvg : checkSvg)} alt="" />
                    <p style={active === 'todo' ? selectedStyle : null}>To-Do</p>
                </li>
                <li onMouseUp={() => univNavigate('/notes')}>
                    <img src={active === 'notes' ? plusFillSvg : (isBlack === true ? plusWhiteSvg : plusSvg)} alt="" />
                    <p style={active === 'notes' ? selectedStyle : null}>{isEnglish ? 'Notes' : 'Poznámky'}</p> 
                </li>
                <li onMouseUp={() => univNavigate('/pomodoro')}>
                    <img src={active === 'pomodoro' ? clockFillSvg : (isBlack === true ? clockWhiteSvg : clockSvg)} alt="" />
                    <p style={active === 'pomodoro' ? selectedStyle : null}>Pomodoro</p>
                </li>
                <li onMouseUp={() => univNavigate('/profile')}>
                    <img className='profilePic' src={active === 'profile' ? userFillSvg : (isBlack === true ? userWhiteSvg : userSvg)} alt="" />
                    <img className='honzak' src={honzak} alt="" />
                    <p style={active === 'profile' ? selectedStyle : null}>{isEnglish ? 'Profile' : 'Profil'}</p>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default LeftMenu