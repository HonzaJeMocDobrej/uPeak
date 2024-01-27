import { useNavigate } from "react-router-dom";
import profilePicDef from "../assets/img/userPicBasic.svg";
import Files from 'react-files'

function ImageSelect() {
  let navigate = useNavigate();

  const submit = () => {
    navigate("/progress");
  };

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
                <img src={profilePicDef} alt="" />
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
