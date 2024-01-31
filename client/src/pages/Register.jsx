/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import 'react-dropdown/style.css';
import axios from 'axios'

function Register(props) {

  const {regData, setRegData} = props

  let navigate = useNavigate()

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
    console.log(regData);
    setRegData({
        user: '',
        pass: '',
        repPass: '',
        email: ''
      })
       axios.post('http://localhost:3000/api/v1/users', {
        username: regData.user,
        password: regData.pass,
        email: regData.email
      })
      .then((res) => {
        if (res.status === 201) {
          navigate('/signup/imageselect')
          console.log(res)
        }
      })
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
            </div>
            <p className='accountInfo'>Already have an account? <pre onClick={signInClick}> Sign in</pre></p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Register