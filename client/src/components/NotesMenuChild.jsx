/* eslint-disable react/prop-types */
import document from "../assets/icons/document.svg";
import binBlack from "../assets/icons/binBlack.svg";


function NotesMenuChild(props) {

    const {noteNames, paramsId, id, dataHeadline} = props

  return (
    <>
        <div className="notesList">
            <div className="leftCont">
              <div className="imgCont">
                <img src={document} />
              </div>
              <p>{paramsId == id ? noteNames : dataHeadline ? dataHeadline : "Undefined"}</p>
            </div>
            <div className="rightCont">
              <img className="bin" src={binBlack} alt="" />
            </div>
          </div>
    </>
  )
}

export default NotesMenuChild