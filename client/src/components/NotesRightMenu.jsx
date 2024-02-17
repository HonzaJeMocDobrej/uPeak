/* eslint-disable react/prop-types */
import "../styles/styles.css";
import magnifyingGlass from "../assets/icons/magnifyingGlass.svg";
import { useEffect, useState } from "react";
import { createNotes, getNotes } from "../models/notes";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NotesMenuChild from "./NotesMenuChild";
import { useNavigate } from "react-router-dom";


const NotesRightMenu = (props) => {
  const { virtualHeading, setVirtualHeading, paramsId, loadNote} = props;
  const auth = useAuthUser();
  let navigate = useNavigate()

  const [notes, setNotes] = useState([]);

  const load = async () => {
    const notes = await getNotes(auth.id);
    if (notes.status === 200) {
        setNotes(notes.data)
    }
  };

  const handleCreateNotes = async () => {
    const notes = await createNotes(auth.id)
    if (notes.status == 201) {
      setNotes(prev => {
        return [
          ...prev,
          notes.data
        ]
      })
      navigate(`/notes/${notes.data.id}`)
      document.cookie = `${auth.username}=${auth.username}; SameSite=None`
      document.cookie = `${auth.username}NoteId=${notes.data.id}; SameSite=None`
      setVirtualHeading('')
    }
    loadNote()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <div className="notesMenu">
        <div className="topCont">
          <div className="notesBtn" onClick={handleCreateNotes}>New Note</div>
          <div className="item">
            <img src={magnifyingGlass} alt="" />
            <p>Search</p>
          </div>
        </div>
        <div className="bottomCont">
          <p className="myNotes">My Notes</p>
            {
                notes.map(note => {
                    return(
                        <NotesMenuChild
                            noteNames={virtualHeading}
                            dataHeadline={note.headline}
                            key={note.id}
                            id={note.id}
                            paramsId={paramsId}
                            loadNotes={load}
                            loadNote={loadNote}
                            notes={notes}
                        />
                    )
                })
            }
        </div>
      </div>
    </>
  );
};

export default NotesRightMenu;
