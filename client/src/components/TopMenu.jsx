/* eslint-disable react/prop-types */
import sun from '../assets/icons/sun.svg'
import moon from '../assets/icons/moon.svg'
import notific from '../assets/icons/notific.svg'
import notificWhite from '../assets/icons/notificWhite.svg'
import basicProfilePic from '../assets/img/userPicBasic.svg'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import '../styles/styles.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function TopMenu(props) {
    
    const {isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle} = props
    const navigate = useNavigate()

    const auth = useAuthUser()

    const handleProfileClick = () => {
        navigate('/profile')
    }

    const langClick = () => {
        setIsEnglish(!isEnglish)
    }

    const switchClick = () => {
        setIsBlack(prevState => !prevState)
        if (isBlack === false) {
            setSwitchStyle(() => {
                return {
                    transform: 'translateX(1.5rem)'
                }
            })
        } else {
            setSwitchStyle(() => {
                return {
                    transform: 'translateX(0rem)'
                }
            })
        }
    }

  return (
    <>
    <nav className={`tMenu ${isBlack ? 'tBlack' : null}`}>
        <div className="langCont">
            <div onClick={langClick} className="langSwitch">{isEnglish ? 'EN' : 'CZ'}</div>
        </div>
        <div className="profCont">
            <div onClick={switchClick} style={isBlack ? {background: '#4D4D4D'} : {background: '#66C2FF'}} className="dark-lightSwitch">
                <img style={switchStyle} src={isBlack ? moon : sun} alt="" />
            </div>
            <div onClick={handleProfileClick} className="profile">
                <img src={auth.profilePic ? `http://localhost:3000/${auth.profilePic}` : basicProfilePic} alt="" />
                <p>
                    {isEnglish ? 'Hello' : 'Ahoj'} 
                    <br /><span>{auth.username}</span>
                </p>
            </div>
        </div>
        <div className="bellCont">
            <img src={isBlack ? notificWhite : notific} alt="" />
        </div>
    </nav>
    </>
  )
}

export default TopMenu