import { useNavigate } from "react-router-dom"

function Login() {

  let navigate = useNavigate()

  const signUpClick = () => {
    navigate('/signup')
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
                <input placeholder='Your Username' type="text" />
                <p className="inputH">Password</p>
                <input placeholder='Your Password' type="text" />
                <button className="signInB">Sign In</button>
            </div>
            <p className='accountInfo'>Do not have an account yet? <pre onClick={signUpClick}> Sign up</pre></p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login