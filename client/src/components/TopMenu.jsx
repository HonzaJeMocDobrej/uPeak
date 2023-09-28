import sun from '../assets/icons/sun.svg'
import moon from '../assets/icons/moon.svg'
import notific from '../assets/icons/notific.svg'
import honzak from '../assets/img/honzak.png'

import '../styles/styles.css'
import { useState } from 'react'

function TopMenu() {

    const [switchStyle, setSwitchStyle] = useState({})
    const [switchIsToggle, setSwitchIsToggle] = useState(false)
    const [svg, setSvg] = useState(sun)

    const switchClick = () => {
        setSwitchIsToggle(prevState => !prevState)
        if (switchIsToggle === false) {
            setSwitchStyle(() => {
                return {
                    transform: 'translateX(1.5rem)'
                }
            })
            setSvg(moon)
        } else {
            setSwitchStyle(() => {
                return {
                    transform: 'translateX(0rem)'
                }
            })
            setSvg(sun)
        }
    }

  return (
    <>
    <nav className="tMenu">
        <div className="langCont">
            <div className="langSwitch">EN</div>
        </div>
        <div className="profCont">
            <div onClick={switchClick} style={switchIsToggle ? {background: '#4D4D4D'} : {background: '#66C2FF'}} className="dark-lightSwitch">
                <img style={switchStyle} src={svg} alt="" />
            </div>
            <div className="profile">
                <img src={honzak} alt="" />
                <p>
                    Hello 
                    <br /><span>Honzak</span>
                </p>
            </div>
        </div>
        <div className="bellCont">
            <img src={notific} alt="" />
        </div>
    </nav>
    </>
  )
}

export default TopMenu