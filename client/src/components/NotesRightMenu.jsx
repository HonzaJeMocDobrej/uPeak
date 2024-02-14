/* eslint-disable react/prop-types */
import "../styles/styles.css";
import magnifyingGlass from "../assets/icons/magnifyingGlass.svg";
import { useEffect, useState } from "react";
import { getNotes } from "../models/notes";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NotesMenuChild from "./NotesMenuChild";


const NotesRightMenu = (props) => {
  const { virtualHeading, paramsId} = props;
  const auth = useAuthUser();

  const [notes, setNotes] = useState([]);

  const load = async () => {
    const notes = await getNotes(auth.id);
    if (notes.status === 200) {
        setNotes(notes.data)
    }
  };

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <div className="notesMenu">
        <div className="topCont">
          <div className="notesBtn">New Note</div>
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
