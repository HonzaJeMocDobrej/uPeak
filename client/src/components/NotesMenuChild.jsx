/* eslint-disable react/prop-types */
import documentImg from "../assets/icons/document.svg";
import binBlack from "../assets/icons/binBlack.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteNote, getNote } from "../models/notes";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


function NotesMenuChild(props) {

    const {noteNames, paramsId, id, dataHeadline, loadNotes, loadNote} = props
    let navigate = useNavigate()
    const [rightHeadline, setRightHeadline] = useState(dataHeadline)
    const auth = useAuthUser()
    
    const determineRightHeadline = () => {
      loadNotes()

      // if (paramsId != id) return setRightHeadline(dataHeadline)
      if (!noteNames && dataHeadline && paramsId != id || !noteNames && dataHeadline && paramsId == id || noteNames && dataHeadline && paramsId != id) return setRightHeadline(dataHeadline)
      if (noteNames && dataHeadline && paramsId == id) return setRightHeadline(noteNames)
      if (!noteNames && !dataHeadline || noteNames && !dataHeadline) return setRightHeadline("Untitled")
    }

    const navToPageById = () => {
      // if (paramsId == id) return
      loadNote()
      navigate(`/notes/${id}`)
      document.cookie = `last_note_id=${id}; SameSite=None`    
    }

    const handleDeleteNote = async () => {
      const deletedNote = await deleteNote(auth.id, id)
      if (deletedNote.status == 200) {
        const notesArr = deletedNote.data
        let index
        notesArr.forEach((note, i) => {
          console.log(note, i)
          if (i == 0) {
            return index = note.id
          }
        });
        if (id == paramsId) {
          document.cookie = `last_note_id=${index}; SameSite=None`
          navigate(`/notes/${index}`)
        }
        loadNotes()
        loadNote()
      } 
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
                <img src={documentImg} />
              </div>
              <div className="midCont" onClick={navToPageById}>
                <p>{rightHeadline}</p>
              </div>
            </div>
            <div className="rightCont">
              <img className="bin" src={binBlack} onClick={handleDeleteNote} alt="" />
            </div>
          </div>
    </>
  )
}

export default NotesMenuChild