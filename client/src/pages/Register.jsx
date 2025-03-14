/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import 'react-dropdown/style.css';
import { checkForDuplicateUsers, createUser, send2FA } from "../models/user";
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { createStats } from "../models/stats";
import { formatDate } from "../functions/functions";

import { createTodoPage } from "../models/todoPage";
import { createNotes } from "../models/notes";
import { createAchievements } from "../models/achievements";

/**
 * 
 * This component is responsible for rendering the registration page.
 * It provides a form where users can input their username, email, and password.
 * The component handles input changes, form submission, and displays error messages.
 * Upon successful form submission, it checks for duplicate users and sends a 
 * verification code to the user's email. The user is then navigated to
 * the validation page.
 * 
 * @param {Object} props - The props object.
 * @param {Object} props.regData - The registration data.
 * @param {Function} props.setRegData - Function to update registration data.
 * @param {Function} props.setVerificationCode - Function to set the verification code.
 * @returns {JSX.Element} - The JSX element.
 */

function Register(props) {

  const {regData, setRegData, setVerificationCode} = props

  let navigate = useNavigate()
  const [info, setInfo] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const signIn = useSignIn()

  const now = new Date

  const groupPageDateHandler = () => {
    const day = now.getDate()
    const month = now.getMonth() + 1 
    const year = now.getFullYear()
    return formatDate(now.getDay(), day, month, year)
  }

  const signInClick = () => {
    navigate('/signin')
  }

  const univInpChange = (e, obj) => {
    const {value} = e.target
    setRegData(prevState => {
      return {
        ...prevState, [obj]: value 
      }
    })
  }

  const submit = async () => {

    if (regData.pass !== regData.repPass) {
      setInfo('Passwords do not match')
      setRegData(prev => {
        return {
          ...prev,
          pass: '',
          repPass: ''
        }
      })
      return
    }

    if (!(regData.email.includes('@')) || !(regData.email.includes('.'))) {
      setInfo('Invalid email')
      setRegData(prev => {
        return {
          ...prev,
          email: ''
        }
      })
      return
    }

    groupPageDateHandler()

    //get user and find similar

    const user = await checkForDuplicateUsers({
      email: regData.email
    })
    .catch(err => {
      setInfo(err.response.data.msg)
      setRegData(prev => {
        return {
          ...prev,
          email: ''
        }
      })
    })

    if (user.status == 200) {
      const sentCode = await send2FA({
        email: regData.email
      })
      .catch(err => {
        setInfo(err.response.data.msg)
      })

      if (sentCode.status == 200) {
        setVerificationCode(sentCode.code)
        navigate('/signup/validate')
      }

    }
    
    
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfo('')
    }, 5000)

    //cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [info])

  useEffect(() => {
      setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return(
      <>
        <LoadingPage />
      </>
    )
  }

  return (
    <>
    <div className="login">
        <div className="lLogin">
            <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="media1300">
        <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="rLogin">
          <div className="centerD">
            <div className="signUp">
                <h2>Sign up</h2>
                <p className="inputH">Username</p>
                <input name="username" onChange={() => univInpChange(event, "user")} value={regData.user} placeholder='Your Username' type="text" />
                <p className="inputH">Email</p>
                <input name="email" onChange={() => univInpChange(event, "email")} value={regData.email} placeholder='Your Email' type='email' />
                <p className="inputH">Password</p>
                <input name="password" onChange={() => univInpChange(event, "pass")} value={regData.pass} placeholder='Your Password' type="password" />
                <p className="inputH">Repeat Password</p>
                <input onChange={() => univInpChange(event, "repPass")} value={regData.repPass} placeholder='Your Password Again' type="password" />
                {/* <input onChange={() => univInpChange(event, "country")} value={regData.country} placeholder='Country' type="text" /> */}
                <button onClick={submit}>Sign Up</button>
                <p className="err" style={{
                  color: '#FF3D00'
                }}>
                  {info}
                </p>
            </div>
            <p className='accountInfo'>Already have an account? <pre onClick={signInClick}> Sign in</pre></p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Register