/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import dropdown from '../assets/icons/dropdownFill.svg'

import axios from "axios"

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

  const submit = () => {
    console.log(regData);
    setRegData({
        user: '',
        pass: '',
        repPass: '',
        email: ''
      })
      axios.get("http://worldtimeapi.org/api/timezone/Europe/Prague")
      .then((res) => {
        console.log(res.data);
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
                <input onChange={() => univInpChange(event, "user")} value={regData.user} placeholder='Your Username' type="text" />
                <p className="inputH">Email</p>
                <input onChange={() => univInpChange(event, "email")} value={regData.email} placeholder='Your Email' type='email' />
                <p className="inputH">Password</p>
                <input onChange={() => univInpChange(event, "pass")} value={regData.pass} placeholder='Your Password' type="text" />
                <p className="inputH">Repeat Password</p>
                <input onChange={() => univInpChange(event, "repPass")} value={regData.repPass} placeholder='Your Password Again' type="text" />
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