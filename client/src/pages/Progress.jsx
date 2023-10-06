/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/topMenu"

import '../styles/styles.css'

function Progress(props) {

    const {active, isEnglish, setIsEnglish} = props

return (
  <>
  <div className="menuCont">
      <LeftMenu
          active={active}
          isEnglish={isEnglish}
          setIsEnglish={setIsEnglish}
      />
      <TopMenu
        isEnglish={isEnglish}
        setIsEnglish={setIsEnglish}
      />
  </div>
  </>
)
}

export default Progress