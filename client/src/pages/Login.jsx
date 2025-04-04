/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import { comparePasswords, send2FA } from "../models/user";
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { createTodoPage, deleteOldTodoPages } from "../models/todoPage";
import { formatDate } from "../functions/functions";

/**
 * Login Component
 * 
 * This component is responsible for rendering the login page.
 * The component will render a form where the user can enter their email and a password.
 * When the user clicks the submit button, the component will send a request to the API to check if the password is correct.
 * If the request is successful, the user will be redirected to the progress page.
 * If the request fails, the component will render an error message to the user.
 * The component will also render a link to the sign up page and a link to the forgot password page.
 * @param {Object} props - The props object.
 * @param {String} props.logData.email - The user's email.
 * @param {String} props.logData.pass - The user's password.
 * @returns {JSX.Element} - The JSX element.
 */
function Login(props) {

  const {logData, setLogData} = props;
  const [info, setInfo] = useState('')
  const [isLoaded, setIsLoaded] = useState(false) 

  let navigate = useNavigate()

  const signIn = useSignIn()

  const now = new Date

  // const sendCode = async () => {
  //   const sentCode = await send2FA({
  //           email: regData.email
  //         })
  //         .catch(err => {
  //           setInfo(err.response.data.msg)
  //         })
    
  //         if (sentCode.status == 200) {
  //           setVerificationCode(sentCode.code)
  //           navigate('/signup/validate')
  //         }
  // }

  const groupPageDateHandler = () => {
    const day = now.getDate()
    const month = now.getMonth() + 1 
    const year = now.getFullYear()
    return formatDate(now.getDay(), day, month, year)
  }

  const loadDeleted = async (userId) => {
    const todoPage = await deleteOldTodoPages(userId);
    if (todoPage.status === 200) {
      // console.log(todoPage.msg);
    }
  };
  

  const signUpClick = () => {
    navigate('/signup')
  }

  const univInpChange = (e, obj) => {
    const {value} = e.target
    setLogData(prevState => {
      return {
        ...prevState, [obj]: value 
      }
    })
  }

  const submit = async () => {

    const user = await comparePasswords(logData)
    .catch(err => {
      if (err.response.data.failed === 'email') {
        setLogData({
          email: '',
          pass: ''
        })
      }
      if (err.response.data.failed === 'password') {
        setLogData(prev => {
          return {
            ...prev,
            pass: ''
          }
        })
      }
      setInfo(err.response.data.msg)
    })

    if (user.status == 200) {
      signIn({
        auth: {
          token: user.token,
          type: 'Bearer',
        },
        userState: {
          id: user.data.id,
          email: user.data.email,
          username: user.data.username,
          profilePic: user.data.profilePic
        }
      })
      loadDeleted(user.data.id)
      await createTodoPage(user.data.id, groupPageDateHandler())
      .catch(err => setInfo(err.response.data.msg))
      // console.log(user.token);
      document.cookie = `user=${user.data.username}; SameSite=None`
      navigate(`/progress`)
      return
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
        <div className="lLogin logBg">
            <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="media1300">
        <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="rLogin">
          <div className="centerD">
            <div className="signUp signIn">
                <h2>Sign in</h2>
                <p className="inputH">Email</p>
                <input onChange={() => univInpChange(event, "email")} value={logData.email} placeholder='Your Email' type="email" />
                <p className="inputH">Password</p>
                <input onChange={() => univInpChange(event, "pass")} value={logData.pass} placeholder='Your Password' type="password" />
                <button onClick={submit} className="signInB">Sign In</button>
                <p className="err" style={{
                  color: '#FF3D00'
                }}>
                  {info}
                </p>
            </div>
            <p className='accountInfo'>Do not have an account yet? <pre onClick={signUpClick}> Sign up</pre></p>
            <p className="accountInfo forgotAccount" onClick={() => {
              setLogData({
                pass: '',
                email: ''
              })
              navigate('/signin/sendcode')
            }}>Forgot Password?</p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login