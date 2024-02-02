/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import { comparePasswords } from "../models/user";

function Login(props) {

  const {logData, setLogData} = props;
  const [info, setInfo] = useState('')
  const [isLoaded, setIsLoaded] = useState(false) 

  let navigate = useNavigate()
  

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
                <p style={{
                  marginLeft: 0,
                  marginRight: '2.4rem',
                  textAlign: "center",
                  color: '#FF3D00'
                }}>
                  {info}
                </p>
            </div>
            <p className='accountInfo'>Do not have an account yet? <pre onClick={signUpClick}> Sign up</pre></p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login