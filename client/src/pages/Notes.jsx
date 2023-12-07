/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/topMenu"
import NotesRightMenu from "../components/NotesRightMenu"

import '../styles/styles.css'

function Notes(props) {

    const {active, isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle} = props



  return (
    <>
    <div className="menuCont">
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
          <NotesRightMenu />
          <div className="notesCont">
            
          </div>
        </main>
    </div>
    </>
  )
}

export default Notes