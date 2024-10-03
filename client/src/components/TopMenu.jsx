/* eslint-disable react/prop-types */
import sun from '../assets/icons/sun.svg'
import moon from '../assets/icons/moon.svg'
import notific from '../assets/icons/notificNormal.svg'
import notificWhite from '../assets/icons/notificNormalWhite.svg'
import notificActiveWhite from '../assets/icons/notificWhite.svg'
import notificActiveBlack from '../assets/icons/notific.svg'
import basicProfPic from '../assets/img/userPicBasic.svg'
import greenCheck from '../assets/icons/greenCheckFill.svg'
import checkFill from '../assets/icons/checkFill.svg'


import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import '../styles/styles.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { checkIfImgExists } from '../functions/functions';
import NotificationsRow from './NotificationsRow'
import { getNotificationsById } from '../models/notifications'

function TopMenu(props) {
    
    const {isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle} = props
    const navigate = useNavigate()

    const auth = useAuthUser()
    const [imgSrc, setImgSrc] = useState()
    const [isNotificOpen, setIsNotificOpen] = useState(false)

    const [notifData, setNotificData] = useState([])


    

    const handleProfileClick = () => {
        navigate('/profile')
    }

    const langClick = () => {
        setIsEnglish(prevState => !prevState)
        localStorage.setItem('isEnglish', !isEnglish)
    }

    const switchClick = () => {
        setIsBlack(prevState => !prevState)
        localStorage.setItem('isBlack', !isBlack)
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

    const getNotific = async () => {
        const notific = await getNotificationsById(auth.id)
        if (!notific.data) return setNotificData([])
        setNotificData(notific.data.reverse())
        console.log(notific.data)
    }

    

    useEffect(() => {
        checkIfImgExists(setImgSrc, auth.profilePic, basicProfPic)
    }, [auth])

    useEffect(() => {
        if (isBlack === false) {
            setSwitchStyle(() => {
                return {
                    transform: 'translateX(0rem)'
                }
            })
        } else {
            setSwitchStyle(() => {
                return {
                    transform: 'translateX(1.5rem)'
                }
            })
        }

    }, [])

    useEffect(() => {
        getNotific()
    }, [isNotificOpen])

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
                <img src={imgSrc} alt="" />
                <p>
                    {isEnglish ? 'Hello' : 'Ahoj'} 
                    <br /><span>{auth.username}</span>
                </p>
            </div>
        </div>
        <div className="bellCont">
            <img onClick={() => setIsNotificOpen(prev => !prev)} src={isBlack ? notificWhite : notific} className='notificImg' alt="" />
            <div style={{
                display: isNotificOpen ? 'flex' : 'none',
                backgroundColor: isBlack ? '#333' : '#FFF',
                borderLeft: isBlack ? 'solid 2px rgba(255, 255, 255, 0.22)' :'solid 2px rgba(51, 51, 51, 0.09)',
                borderRight: isBlack ? 'solid 2px rgba(255, 255, 255, 0.22)' :'solid 2px rgba(51, 51, 51, 0.09)',
                borderBottom: isBlack ? 'solid 2px rgba(255, 255, 255, 0.22)' :'solid 2px rgba(51, 51, 51, 0.09)',
                }} className="bellPopup">
                    {
                        notifData.length == 0 &&
                        <div className="noNotific" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <img src={greenCheck} alt="" />
                            <p>{isEnglish ? 'All sorted' : 'Nic nového'}</p>
                        </div>
                    }

                        {/* <div className={`row ${isBlack ? 'rowBlack' : ''}`}>
                            <div className="topCont">
                                <img src={checkFill} className='imgPage' alt="" />
                                <div className="rightCont">
                                    <p className='pInfo'>Congrats! You have created 50 todos in Todo</p>
                                    <img className='imgBin' src={bin} alt="" />
                                </div>
                            </div>
                                <p className='pTime'>5 minutes ago</p>
                        </div>
                        <div className={`row ${isBlack ? 'rowBlack' : ''}`}>
                            <div className="topCont">
                                <img src={checkFill} className='imgPage' alt="" />
                                <div className="rightCont">
                                    <p className='pInfo'>Congrats!</p>
                                    <img className='imgBin' src={bin} alt="" />
                                </div>
                            </div>
                                <p className='pTime'>5 minutes ago</p>
                        </div>
                        <div className={`row ${isBlack ? 'rowBlack' : ''}`}>
                            <div className="topCont">
                                <img src={checkFill} className='imgPage' alt="" />
                                <div className="rightCont">
                                    <p className='pInfo'>Congrats! You have created 50 todos in Todo</p>
                                    <img className='imgBin' src={bin} alt="" />
                                </div>
                            </div>
                                <p className='pTime'>5 minutes ago</p>
                        </div>
                        <div className={`row ${isBlack ? 'rowBlack' : ''}`}>
                            <div className="topCont">
                                <img src={checkFill} className='imgPage' alt="" />
                                <div className="rightCont">
                                    <p className='pInfo'>Congrats! You have created 50 todos in Todo</p>
                                    <img className='imgBin' src={bin} alt="" />
                                </div>
                            </div>
                                <p className='pTime'>5 minutes ago</p>
                        </div>
                        <div className={`row ${isBlack ? 'rowBlack' : ''}`}>
                            <div className="topCont">
                                <img src={checkFill} className='imgPage' alt="" />
                                <div className="rightCont">
                                    <p className='pInfo'>Congrats! You have created 50 todos in Todo</p>
                                    <img className='imgBin' src={bin} alt="" />
                                </div>
                            </div>
                                <p className='pTime'>5 minutes ago</p>
                        </div>
                        <div className={`row ${isBlack ? 'rowBlack' : ''}`}>
                            <div className="topCont">
                                <img src={checkFill} className='imgPage' alt="" />
                                <div className="rightCont">
                                    <p className='pInfo'>Congrats! You have created 50 todos in Todo</p>
                                    <img className='imgBin' src={bin} alt="" />
                                </div>
                            </div>
                                <p className='pTime'>5 minutes ago</p>
                        </div> */}

                        {
                            notifData.map(e => {
                                return (
                                    <NotificationsRow 
                                        isBlack={isBlack}
                                        img={checkFill}
                                        value={e.value}
                                        time={e.createdAt}
                                        page={e.page}
                                        key={e.id}
                                        id={e.id}
                                        isNotificOpen={isNotificOpen}
                                        getNotific={getNotific}
                                    />
                                )
                            })
                        }
                        
            </div>
        </div>
    </nav>
    </>
  )
}

export default TopMenu