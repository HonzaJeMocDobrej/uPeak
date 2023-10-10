import React from 'react'

function Login() {
  return (
    <>
    <div className="login">
        <div className="lLogin">
            <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="rLogin">
            <div className="signUp">
                <h2>Sign up</h2>
                <p className="inputH">Username</p>
                <input placeholder='Your Username' type="text" />
                <p className="inputH">Password</p>
                <input placeholder='Your Password' type="text" />
                <p className="inputH">Repeat Password</p>
                <input placeholder='Your Password Again' type="text" />
                <p className="inputH">Country</p>
                <input placeholder='Choose' type="text" />
                <button>Sign Up</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login