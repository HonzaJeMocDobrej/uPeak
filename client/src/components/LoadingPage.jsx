import { useEffect, useState } from 'react'
import arrowBack from '../assets/icons/arrowBack.svg'
import userBlue from '../assets/icons/userBlue.svg'
import { useNavigate } from 'react-router-dom'

function LoadingPage() {

  const [showMore, setShowMore] = useState(false)
  let navigate = useNavigate()

  const customNav = (to) => {
    navigate(to)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowMore(true)
    }, 1000)
  }, [])

  return (
    <>
        <div className='loadingPage'>
          <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
          <div className="spinner"></div>
          <div style={{display: showMore ? 'block' : 'none'}} className="showMoreWrapper">
            <h2>Yikes, It looks like something isn&apos;t quite right 😓</h2>
          <div className="wholeNavCont">
          <div onClick={() => customNav('/')} className="navCont">
            <img src={arrowBack} alt="" />
            <p>Go Back</p>
          </div>
          <div onClick={() => customNav('/signup')} className="navCont">
            <img src={userBlue} alt="" />
            <p>Signup</p>
          </div>
          <div onClick={() => customNav('/signin')} className="navCont">
            <img src={userBlue} alt="" />
            <p>Signin</p>
          </div>
          </div>
          </div>
        </div>
    </>
  )
}

export default LoadingPage