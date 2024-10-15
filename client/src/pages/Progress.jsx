/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import LeftMenu from "../components/LeftMenu"
import TopMenu from "../components/TopMenu"

import '../styles/styles.css'

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { getUserStats } from "../models/stats";
import LoadingPage from "../components/LoadingPage";
import InfoCircle from "../components/InfoCircle";

function Progress(props) {

  const {active, isEnglish, setIsEnglish, isBlack, setIsBlack, switchStyle, setSwitchStyle, setIsNotificationRead, isNotificationRead} = props

  const [isPageOpen, setIsPageOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [data, setData] = useState(null)

  const [page, setPage] = useState('To-Do')
  const [type, setType] = useState('Streak')

  const [isLoaded, setIsLoaded] = useState(false)
  
  const auth = useAuthUser()

  const [displayedNum, setDisplayedNum] = useState()
  const [formattedNum, setFormattedNum] = useState()
  const [displayedTime, setDisplayedTime] = useState('days')
  const [counterClass, setCounterClass] = useState('counterYellow')

  const load = async () => {
    const stats = await getUserStats(auth.id)
    if(stats.status === 500) return setIsLoaded(null);
      if(stats.status === 200){
        setData(stats.data);
        setTimeout(() => {
          setIsLoaded(true);
          
        }, 500)
      }
  }


  const counterFormatter = () => {
    if (displayedNum < 7) {
      setCounterClass('counterYellow')
      setDisplayedTime('days')
      setFormattedNum(displayedNum)
    }

    if (displayedNum >= 7 && displayedNum < 31) {
      setCounterClass('counterOrange')
      setDisplayedTime('days')
      setFormattedNum(displayedNum)
    }

    if (displayedNum >= 31 && displayedNum < 91) {
      setFormattedNum(Math.floor(displayedNum / 31))
      setDisplayedTime('months')
      setCounterClass('counterRed')
    }
    if (displayedNum >= 91 && displayedNum < 365) {
      setFormattedNum(Math.floor(displayedNum / 31))
      setDisplayedTime('months')
      setCounterClass('counterPurple')
    }
    if (displayedNum >= 365) {
      setFormattedNum(Math.floor(displayedNum / 365))
      setDisplayedTime('years')
      setCounterClass('counterPurple')
    }
  }


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
      load()
  }, [])

  useEffect(() => {
    const handleDisplayedNum = (pageVal, typeVal, num) => {
      if (page == pageVal && type == typeVal) {
        setDisplayedNum(num)
      }
    }
    if (data) {
        handleDisplayedNum('To-Do', 'Streak', data.todoStreak)
        handleDisplayedNum('Notes', 'Streak', data.notesStreak)
        handleDisplayedNum('Pomodoro', 'Streak', data.pomodoroStreak)
        handleDisplayedNum('To-Do', 'Total', data.todoTotal)
        handleDisplayedNum('Notes', 'Total', data.notesTotal)
        handleDisplayedNum('Pomodoro', 'Total', data.pomodoroTotal)
    }
  }, [data, page, type])

  useEffect(() => {
    if (!data) {
      return
    }

    counterFormatter()    

  }, [displayedNum, counterFormatter])

  if (!isLoaded) {
    return(
      <>
        <LoadingPage />
      </>
    )
  }

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
        setIsNotificationRead={setIsNotificationRead}
        isNotificationRead={isNotificationRead}
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
          <div className={`counterCont ${counterClass}`}>
            <div className="counter">
              <div style={isBlack ? {backgroundColor: '#333'} : {backgroundColor: '#FFF'}} className="counterInside">{formattedNum}</div>
            </div>
            {/* <h2>{displayedTime == 'days' ? isEnglish ? 'DAYS' : 'DNŮ' : isEnglish ? 'MONTHS' : 'MĚSÍCŮ'}</h2> */}
            {
              displayedTime == 'days' && <h2>{isEnglish ? formattedNum == 1 ? 'DAY' : 'DAYS' : formattedNum == 1 ? 'DEN' : formattedNum > 1 && formattedNum < 5 ? 'DNY' : 'DNŮ'}</h2>
            }
            {
              displayedTime == 'months' && <h2>{isEnglish ? formattedNum == 1 ? 'MONTH' : 'MONTHS' : formattedNum == 1 ? 'MĚSÍC' : formattedNum > 1 && formattedNum < 5 ? 'MĚSÍCE' : 'MĚSÍCŮ'}</h2>
            }
            {
              displayedTime == 'years' && <h2>{isEnglish ? formattedNum == 1 ? 'YEAR' : 'YEARS' : formattedNum == 1 ? 'ROK' : formattedNum > 1 && formattedNum < 5 ? 'ROKY' : 'ROKŮ'}</h2>
            }
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
          <InfoCircle
            isBlack={isBlack}
          />
        </div>
      </main>
  </div>
  </>
)
}

export default Progress