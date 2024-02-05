/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/TopMenu"

import '../styles/styles.css'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { getUserStats } from "../models/stats";

function Progress(props) {

  const {active, isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle} = props

  const [isPageOpen, setIsPageOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false)

  const [page, setPage] = useState('To-Do')
  const [type, setType] = useState('Streak')

  const auth = useAuthUser()

  


  const toggleDropdownPage = () => {
    setIsPageOpen(prev => !prev)
  }

  const toggleDropdownType = () => {
    setIsTypeOpen(prev => !prev)
  }

  const selectPage = (page) => {
    setPage(page)
  }

  const selectType = (type) => {
    setType(type)
  }

  useEffect(() => {
    const handleStats = async () => {
      const stats = await getUserStats(auth.id)
      .catch(err => console.log(err.response.data.msg))
    
      if (stats.status === 200) {
        console.log(stats.data)
      }
    }
    handleStats()
  }, [auth.id])

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
        <div className="progressConts">
          <div className="selectPageCont">
            <div onClick={toggleDropdownPage} className={`h2Cont ${isPageOpen ? 'rotate' : 'goBack'}`}>
              <h2>{page}</h2>
              <ul style={isPageOpen ? {display: "flex"} : {display: "none"}} className="dropdown">
                <li onClick={() => selectPage('To-Do')} className={page === 'To-Do' ? 'selectedLi' : null}>To-Do</li>
                <li onClick={() => selectPage('Notes')} className={page === 'Notes' ? 'selectedLi' : null}>Notes</li>
                <li onClick={() => selectPage('Pomodoro')} className={page === 'Pomodoro' ? 'selectedLi' : null}>Pomodoro</li>
              </ul>
            </div>
          </div>
          <div className="counterCont">
            <div className="counter">
              <div style={isBlack ? {backgroundColor: '#333'} : {backgroundColor: '#FFF'}} className="counterInside">5</div>
            </div>
            <h2>{isEnglish ? 'DAYS' : 'DNŮ'}</h2>
          </div>
          <div className="selectTypeCont">
            <div onClick={toggleDropdownType} className={`h3Cont ${isTypeOpen ? 'rotate' : 'goBack'}`}>
              <h3>{type}</h3>
              <ul style={isTypeOpen ? {display: "flex"} : {display: 'none'}} className="dropdown">
                  <li onClick={() => selectType('Streak')} className={type === 'Streak' ? 'selectedLi' : null}>Streak</li>
                  <li onClick={() => selectType('Total')} className={type === 'Total' ? 'selectedLi' : null}>Total</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
  </div>
  </>
)
}

export default Progress