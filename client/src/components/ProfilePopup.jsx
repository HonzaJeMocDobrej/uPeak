/* eslint-disable react/prop-types */

function ProfilePopup(props) {

    const {toggle,setToggle, isBlack, change} = props

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
            ></input>

            <div onClick={() => setToggle(false)} className="saveBtn">Save</div>

      </div>
  )
}

export default ProfilePopup