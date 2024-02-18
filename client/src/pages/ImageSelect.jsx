import { useNavigate } from "react-router-dom";
import Files from 'react-files'
import { useEffect, useState } from "react";
import { patchImage } from "../models/user";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { checkIfImgExists } from "../functions/functions";
import basicProfPic from '../assets/img/userPicBasic.svg'

function ImageSelect() {
  let navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null)
  const [imgSrc, setImgSrc] = useState()

  const auth = useAuthUser()
  const signIn = useSignIn()

  const submit = async () => {
    
    const data = new FormData
    data.append('profilePic', profilePic)
    
    const img = await patchImage(auth.email, data)
    .catch(err => {
      console.log(err.response.data.msg)
    })
    console.log(img);
    signIn({
      auth: {
        token: img.token,
        type: 'Bearer',
      },
      userState: {
        id: img.data.id,
        email: img.data.email,
        username: img.data.username,
        profilePic: img.profilePic
      }
    })
    navigate(`/progress`);
  };

  const getImage = async (file) => {
    const fileObj = file[0]
    const img = URL.createObjectURL(fileObj)
    console.log(img)
    setProfilePic(fileObj)
  }

  useEffect(() => {
    checkIfImgExists(setImgSrc, auth.profilePic, basicProfPic)
}, [auth])

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
                <img src={profilePic ? URL.createObjectURL(profilePic) :  imgSrc} alt="" />
                <p>
                  Hello
                  <br />
                  <span>{auth.username}</span>
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
