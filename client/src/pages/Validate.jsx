import AuthCode from 'react-auth-code-input'

function Validate() {
  return (
    <div className="login validate">
        <div className="lLogin">
            <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="media1300">
        <h1 className='fullHeading'>u<span className='blackSpan'>Peak<div className="underline"></div></span></h1>
        </div>
        <div className="rLogin">
          <div className="centerD">
            <div className="signUp">
                <h2>Enter your code</h2>
                <AuthCode containerClassName='authCodeCont' allowedCharacters='numeric' />
                <div className="bottomCodeDivs">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <button>Submit</button>
                <p className="err" style={{
                  color: '#FF3D00'
                }}>
                  {/* {info} */}
                </p>
            </div>
            <p className='accountInfo'>Didn&apos;t get the code? <pre> Resend it</pre></p>
          </div>
        </div>
    </div>
  )
}

export default Validate