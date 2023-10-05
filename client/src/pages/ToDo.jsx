/* eslint-disable react/prop-types */
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/topMenu"

import '../styles/styles.css'

function ToDo(props) {

    const {active} = props

  return (
    <>
    <div className="menuCont">
        <LeftMenu
            active={active}
        />
        <TopMenu />
    </div>
    </>
  )
}

export default ToDo