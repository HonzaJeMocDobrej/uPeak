/* eslint-disable react/prop-types */

function ProfilePopup(props) {

    const {toggle,setToggle, isBlack, change, setNew, newInput, setTypePassword, typePassword} = props

    const handleChange = (e, setter) => {
      setter(e.target.value)
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

            <div onClick={() => setToggle(false)} className="saveBtn">Save</div>

      </div>
  )
}

export default ProfilePopup