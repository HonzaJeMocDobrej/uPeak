/* eslint-disable react/prop-types */
import AuthCode from 'react-auth-code-input'
import { createUser, send2FA, updateUserPassword, updateUserPasswordCode } from '../models/user'
import { createStats } from '../models/stats'
import { createAchievements } from '../models/achievements'
import { createTodoPage, deleteOldTodoPages } from '../models/todoPage'
import { createNotes } from '../models/notes'
import { formatDate } from '../functions/functions'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ValidateForgotPassword(props) {

  const { logData, setLogData, setVerificationCode, verificationCode } = props

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

  const loadDeleted = async (userId) => {
      const todoPage = await deleteOldTodoPages(userId);
      if (todoPage.status === 200) {
        // console.log(todoPage.msg);
      }
    };

  const submit = async () => {

    if (verificationCode != codeInput) {
      setInfo('Wrong code')
      setCodeInput('')
      authInputRef.current?.clear()
      return
    } 

    const user = await updateUserPasswordCode({
        "newPass": logData.pass,
        "email": logData.email
    })
    .catch(err => {
      setInfo(err.response.data.msg)
    //   navigate('/signup')
    })

    if (user.status === 200) {
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
          setLogData({
            pass: '',
            email: ''
          })
          navigate(`/progress`)
      return
    }
  }

  const resendCode = async () => {
    const sentCode = await send2FA({
      email: logData.email
    })
    .catch(err => {
      setInfo(err.response.data.msg)
    })

    if (sentCode.status == 200) {
      setVerificationCode(sentCode.code)
    }
  }

  useEffect(() => {
    console.log(logData)
  }, [logData])

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

export default ValidateForgotPassword