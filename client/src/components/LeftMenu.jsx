import progressSvg from '../assets/icons/trophyFill.svg'
import ClockSvg from '../assets/icons/clock.svg'
import checkSvg from '../assets/icons/check.svg'
import plusSvg from '../assets/icons/plusCircle.svg'
import userSvg from '../assets/icons/userCircle.svg'
import '../styles/styles.css'

function LeftMenu() {
  return (
    <>
        <nav className="lMenu">
            <div className="nameCont">
                <h1>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
            </div>
            <ul className="itemsCont">
                <li className='selected'>
                    <img src={progressSvg} alt="" />
                    <p>Progress</p>
                </li>
                <li>
                    <img src={checkSvg} alt="" />
                    <p>To-Do</p>
                </li>
                <li>
                    <img src={plusSvg} alt="" />
                    <p>Notes</p> 
                </li>
                <li>
                    <img src={ClockSvg} alt="" />
                    <p>Pomodoro</p>
                </li>
                <li>
                    <img src={userSvg} alt="" />
                    <p>Profile</p>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default LeftMenu