/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

function Login(props) {

  const {logData, setLogData} = props; 

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

  const submit = () => {
    console.log(logData);
    setLogData({
        user: '',
        pass: '',
      })
  }

  return (
    <>
    <div className="login">
        <div className="lLogin diffBg">
            <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="media1300">
        <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="rLogin">
          <div className="centerD">
            <div className="signUp signIn">
                <h2>Sign in</h2>
                <p className="inputH">Username</p>
                <input onChange={() => univInpChange(event, "user")} value={logData.user} placeholder='Your Username' type="text" />
                <p className="inputH">Password</p>
                <input onChange={() => univInpChange(event, "pass")} value={logData.pass} placeholder='Your Password' type="text" />
                <button onClick={submit} className="signInB">Sign In</button>
            </div>
            <p className='accountInfo'>Do not have an account yet? <pre onClick={signUpClick}> Sign up</pre></p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login