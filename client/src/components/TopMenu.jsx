/* eslint-disable react/prop-types */
import sun from '../assets/icons/sun.svg'
import moon from '../assets/icons/moon.svg'
import notific from '../assets/icons/notific.svg'
import notificWhite from '../assets/icons/notificWhite.svg'
import honzak from '../assets/img/honzak.png'

import '../styles/styles.css'

function TopMenu(props) {
    
    const {isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle} = props

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
            <div className="profile">
                <img src={honzak} alt="" />
                <p>
                    {isEnglish ? 'Hello' : 'Ahoj'} 
                    <br /><span>Honzak</span>
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