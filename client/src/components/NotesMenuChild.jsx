/* eslint-disable react/prop-types */
import document from "../assets/icons/document.svg";
import binBlack from "../assets/icons/binBlack.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function NotesMenuChild(props) {

    const {noteNames, paramsId, id, dataHeadline, load, loadData} = props
    let navigate = useNavigate()
    const [rightHeadline, setRightHeadline] = useState(dataHeadline)
    
    const determineRightHeadline = () => {
      load()
      // if (paramsId != id) return setRightHeadline(dataHeadline)
      if (!noteNames && dataHeadline && paramsId != id || !noteNames && dataHeadline && paramsId == id || noteNames && dataHeadline && paramsId != id) return setRightHeadline(dataHeadline)
      if (noteNames && dataHeadline && paramsId == id) return setRightHeadline(noteNames)
      if (!noteNames && !dataHeadline || noteNames && !dataHeadline) return setRightHeadline("Untitled")
    }

    const navToPageById = () => {
      // if (paramsId == id) return
      navigate(`/notes/${id}`)    
      loadData()
    }

    useEffect(() => {
      determineRightHeadline()
      console.log(`noteNames: ${noteNames} data: ${dataHeadline}`)
    }, [noteNames])

  return (
    <>
        <div className="notesList">
            <div className="leftCont">
              <div className="imgCont">
                <img src={document} />
              </div>
              <div className="midCont" onClick={navToPageById}>
                <p>{rightHeadline}</p>
              </div>
            </div>
            <div className="rightCont">
              <img className="bin" src={binBlack} alt="" />
            </div>
          </div>
    </>
  )
}

export default NotesMenuChild