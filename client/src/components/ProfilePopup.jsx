/* eslint-disable react/prop-types */

import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { updateUser } from "../models/user"
import useSignIn from "react-auth-kit/hooks/useSignIn"

function ProfilePopup(props) {

  const auth = useAuthUser()
  const signIn = useSignIn()

    const {toggle,setToggle, isBlack, change, setNew, newInput, setTypePassword, typePassword} = props

    const handleChange = (e, setter) => {
      setter(e.target.value)
    }

    const handleClick = async () => {
      setToggle(false)

      if (change == 'Username') {
        const user = await updateUser(auth.id, [
          {
            'propName': 'username',
            'value': newInput
          },
          {
            'propName': 'password',
            'value': typePassword
          }
        ])
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
        
      }
      setNew('')
      setTypePassword('')
    }

  return (
    <div  style={{
        display: toggle ? 'flex' : 'none'
      }}  className="popup">
        <p>
            New {change}
        </p>
        <input
              style={{
                color: isBlack ? "rgb(204, 204, 204)" : "#808080",
              }}
              maxLength={20}
              className="userInput"
              placeholder={`New ${change}`}
              onChange={() => handleChange(event, setNew)}
              value={newInput}
              type={change == 'Password' ? 'password' : 'text'}
            ></input>
            <p>
            {change == 'Password' ? "Old Password" : "Password"}
            </p>
        <input
              style={{
                color: isBlack ? "rgb(204, 204, 204)" : "#808080",
              }}
              className="passInput"
              placeholder={change == 'Password' ? "Old Password" : "Password"}
              onChange={() => handleChange(event, setTypePassword)}
              value={typePassword}
              type="password"
            ></input>

            <div onClick={handleClick} className="saveBtn">Save</div>

      </div>
  )
}

export default ProfilePopup