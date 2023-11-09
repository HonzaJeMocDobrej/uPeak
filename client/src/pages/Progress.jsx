/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/topMenu"

import '../styles/styles.css'

import dropdown from '../assets/icons/dropdown.svg' 

function Progress(props) {

  const {active, isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle} = props

return (
  <>
  <div className={`menuCont ${isBlack ? 'menuBlack' : null}`}>
      <LeftMenu
          active={active}
          isEnglish={isEnglish}
          setIsEnglish={setIsEnglish}
          isBlack={isBlack}
      />
      <TopMenu
        isEnglish={isEnglish}
        setIsEnglish={setIsEnglish}
        isBlack={isBlack}
        setIsBlack={setIsBlack}
        switchStyle={switchStyle}
        setSwitchStyle={setSwitchStyle}
      />
      <main className={`mainStuff ${isBlack ? 'mainBlack' : null}`}>
        <div className="conts">
          <div className="selectPageCont">
            <h2>To-Do</h2>
          </div>
          <div className="counterCont">
            <div className="counter">
              <div style={isBlack ? {backgroundColor: '#333'} : {backgroundColor: '#FFF'}} className="counterInside">5</div>
            </div>
            <h2>{isEnglish ? 'DAYS' : 'DNŮ'}</h2>
          </div>
          <div className="selectTypeCont">
            <h3>Streak</h3>
          </div>
        </div>
      </main>
  </div>
  </>
)
}

export default Progress