/* eslint-disable react/prop-types */
import AuthCode from 'react-auth-code-input'
import { createUser, send2FA } from '../models/user'
import { createStats } from '../models/stats'
import { createAchievements } from '../models/achievements'
import { createTodoPage } from '../models/todoPage'
import { createNotes } from '../models/notes'
import { formatDate } from '../functions/functions'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Validate(props) {

  const { regData, setRegData, setVerificationCode, verificationCode } = props

  const [info, setInfo] = useState('')
  const [codeInput, setCodeInput] = useState('')

  const authInputRef = useRef(null)
  
  let navigate = useNavigate()
  const signIn = useSignIn()

  const now = new Date

  const groupPageDateHandler = () => {
    const day = now.getDate()
    const month = now.getMonth() + 1 
    const year = now.getFullYear()
    return formatDate(now.getDay(), day, month, year)
  }

  const submit = async () => {

    if (verificationCode != codeInput) {
      setInfo('Wrong code')
      setCodeInput('')
      authInputRef.current?.clear()
      return
    } 

    const user = await createUser(regData)
    .catch(err => {
      setInfo(err.response.data.msg)
      setRegData({
        user: '',
        pass: '',
        repPass: '',
        email: ''
      })
      navigate('/signup')
    })

    if (user.status === 201) {
      signIn({
        auth: {
          token: user.token,
          type: 'Bearer',
        },
        userState: {
          username: user.data.username,
          email: user.data.email,
          id: user.data.id
        }
      })
      await createStats(user.data.id)
      .catch(err => setInfo(err.response.data.msg))
      await createAchievements(user.data.id)
      .catch(err => setInfo(err.response.data.msg))
      await createTodoPage(user.data.id, groupPageDateHandler())
      .catch(err => setInfo(err.response.data.msg))
      const notes = await createNotes(user.data.id)
      // .catch(err => console.log(err.response.data.msg))
      if (notes.status === 201 && notes) {
        document.cookie = `${user.data.username}=${user.data.username}; SameSite=None; secure=false;`
        document.cookie = `${user.data.username}NoteId=${notes.notes[0].id}; SameSite=None; secure=false;`
      }


      navigate(`/signup/imageselect`)
      return
    }
  }

  const resendCode = async () => {
    const sentCode = await send2FA({
      email: regData.email
    })
    .catch(err => {
      setInfo(err.response.data.msg)
    })

    if (sentCode.status == 200) {
      setVerificationCode(sentCode.code)
    }
  }

  useEffect(() => {
    console.log(verificationCode)
    console.log(codeInput)
  }, [verificationCode, codeInput])

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfo('')
    }, 5000)

    //cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [info])


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
                <AuthCode ref={authInputRef} onChange={(res) => setCodeInput(res)} containerClassName='authCodeCont' allowedCharacters='numeric' />
                <div className="bottomCodeDivs">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <button onClick={submit}>Submit</button>
                <p className="err" style={{
                  color: '#FF3D00'
                }}>
                  {info}
                </p>
            </div>
            <p className='accountInfo'>Didn&apos;t get the code? <pre onClick={resendCode}> Resend it</pre></p>
          </div>
        </div>
    </div>
  )
}

export default Validate