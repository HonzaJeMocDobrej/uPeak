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

import honzak from '../assets/img/honzak.png'

import '../styles/styles.css'

import { useNavigate } from 'react-router-dom'


function LeftMenu(props) {

    let navigate = useNavigate()

    const univNavigate = (path) => {
        navigate(path)
    }

    const selectedStyle = {
        'color': '#09F',
        'fontWeight': 700,
      }

    const {active, isEnglish} = props

  return (
    <>
        <nav className="lMenu">
            <div className="nameCont">
                <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
                <h1 className="shortHeading">u<span className='blackSpan'>P<div className="underline"></div></span></h1>
            </div>
            <ul className="itemsCont">
                <li onMouseUp={() => univNavigate('/')} className='selected'>
                    <img src={active ==='progress' ? trophyFill : trophy} alt="" />
                    <p style={active === 'progress' ? selectedStyle : null}>{isEnglish ? 'Progress' : 'Progres'}</p>
                </li>
                <li onMouseUp={() => univNavigate('/todo')}>
                    <img src={active === 'todo' ? checkFillSvg : checkSvg} alt="" />
                    <p style={active === 'todo' ? selectedStyle : null}>To-Do</p>
                </li>
                <li onMouseUp={() => univNavigate('/notes')}>
                    <img src={active === 'notes' ? plusFillSvg : plusSvg} alt="" />
                    <p style={active === 'notes' ? selectedStyle : null}>{isEnglish ? 'Notes' : 'Poznámky'}</p> 
                </li>
                <li onMouseUp={() => univNavigate('/pomodoro')}>
                    <img src={active === 'pomodoro' ? clockFillSvg : clockSvg} alt="" />
                    <p style={active === 'pomodoro' ? selectedStyle : null}>Pomodoro</p>
                </li>
                <li onMouseUp={() => univNavigate('/profile')}>
                    <img className='profilePic' src={active === 'profile' ? userFillSvg : userSvg} alt="" />
                    <img className='honzak' src={honzak} alt="" />
                    <p style={active === 'profile' ? selectedStyle : null}>{isEnglish ? 'Profile' : 'Profil'}</p>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default LeftMenu