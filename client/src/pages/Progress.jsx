/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/topMenu"

import '../styles/styles.css'

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
      <main className={`mainStuff ${isBlack ? 'mainBlack' : null}`}></main>
  </div>
  </>
)
}

export default Progress