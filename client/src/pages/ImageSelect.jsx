import { useNavigate } from "react-router-dom";
import profilePicDef from "../assets/img/userPicBasic.svg";
import Files from 'react-files'
import { useState } from "react";
import { patchImage } from "../models/user";

function ImageSelect() {
  let navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null)

  const submit = async () => {
    
    // navigate("/progress");
    
    const img = await patchImage('1dc39e05-c003-409e-be5c-0c7aa2a5359c')
    .catch(err => {
      console.log(err.response.data.msg)
    })
    console.log(img);
  };

  const getImage = async (file) => {
    const fileObj = file[0]
    const img = URL.createObjectURL(fileObj)
    console.log(img)
    setProfilePic(img)
  }

  return (
    <>
      <div className="login">
        <div className="lLogin imgSelBg">
          <h1 className="fullHeading">
            u
            <span className="blackSpan">
              Peak<div className="underline"></div>
            </span>
          </h1>
        </div>
        <div className="media1300">
          <h1 className="fullHeading">
            u
            <span className="blackSpan">
              Peak<div className="underline"></div>
            </span>
          </h1>
        </div>
        <div className="rLogin">
          <div className="centerD">
            <div className="signUp signIn uploadImg">
              <h2>Upload a profile picture</h2>
              <div className="profilePicCont">
              <div className="profile">
                <img src={profilePic ? profilePic : profilePicDef} alt="" />
                <p>
                  Hello
                  <br />
                  <span>Honzak</span>
                </p>
              </div>
              <Files
                    className='filesReader'
                    accepts={['image/*']}
                    maxFileSize={5000000}
                    minFileSize={0}
                    name='profilePic'
                    onChange={getImage}
                  >
                    Your Image
                  </Files>
              </div>
              <button onClick={submit} className="signInB">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageSelect;
