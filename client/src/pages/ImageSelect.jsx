import { useNavigate, useParams } from "react-router-dom";
import profilePicDef from "../assets/img/userPicBasic.svg";
import Files from 'react-files'
import { useState } from "react";
import { patchImage } from "../models/user";

function ImageSelect() {
  const { id } = useParams()
  let navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null)

  const submit = async () => {
    
    const data = new FormData
    data.append('profilePic', profilePic)
    navigate(`/progress/`);
    
    const img = await patchImage(id, data)
    .catch(err => {
      console.log(err.response.data.msg)
    })
    console.log(img);
  };

  const getImage = async (file) => {
    const fileObj = file[0]
    const img = URL.createObjectURL(fileObj)
    console.log(img)
    setProfilePic(fileObj)
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
                <img src={profilePic ? URL.createObjectURL(profilePic) : profilePicDef} alt="" />
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
