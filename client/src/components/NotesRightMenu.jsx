/* eslint-disable react/prop-types */
import "../styles/styles.css";
import magnifyingGlass from "../assets/icons/magnifyingGlass.svg";
import { useEffect, useState } from "react";
import { createNotes, getNotes, searchNotes } from "../models/notes";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NotesMenuChild from "./NotesMenuChild";
import { useNavigate } from "react-router-dom";



const NotesRightMenu = (props) => {
  const { virtualHeading, setVirtualHeading, paramsId, loadNote, isSearching, setIsSearching, myNotesColor, loadNotes, isEnglish, isBlack} = props;
  const auth = useAuthUser();
  let navigate = useNavigate()

  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true)


  const load = async () => {
    const notes = await getNotes(auth.id);
    if (notes.status === 200) {
        setNotes(notes.data)
        // console.log('loaded')
        console.log(isSearching)
    }
  };

  const handleCreateNotes = async () => {
    setIsLoaded(false)
    setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    const notes = await createNotes(auth.id)
    if (notes.status == 201) {
      setNotes(prev => {
        return [
          ...prev,
          notes.data
        ]
      })
      navigate(`/notes/${notes.data.id}`)
      document.cookie = `${auth.username}=${auth.username}; SameSite=None; secure=false;`
      document.cookie = `${auth.username}NoteId=${notes.data.id}; SameSite=None; secure=false;`
      setVirtualHeading('')
    }
    loadNote()
    load()
  }

  const handleSearch = async (e) => {
    const notes = await searchNotes(auth.id, e.target.value)
    if (notes.status == 200) {
      setNotes(notes.data)
      setIsSearching(true)
    }
    if (notes.status == 204) {
      setNotes([])
      setIsSearching(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <div style={{
        borderRightColor: isBlack ? 'rgba(255, 255, 255, 0.22)' : 'rgba(51, 51, 51, 0.09)',
        borderLeftColor: isBlack ? 'rgba(255, 255, 255, 0.22)' : 'rgba(51, 51, 51, 0.09)',
      }} className="notesMenu">
        <div className="topCont">
          <div className="notesBtn" onClick={handleCreateNotes}>{isEnglish ? 'New Note' : 'Přidat'}</div>
          <div className="item">
            <img src={magnifyingGlass} alt="" />
            <input type="text" placeholder={isEnglish ? "Search" : 'Hledat'} onChange={handleSearch} />
          </div>
        </div>
        <div className="bottomCont">
          <p style={{color: myNotesColor}} className="myNotes">{isEnglish ? 'My Notes' : 'Moje Poznámky'}</p>
          {!isLoaded && 
          <>
            <div className="spinnerCont">
              <div className="spinner"></div>
            </div>
          </>
          }
            {
                notes.map(note => {
                   
                    
                  
                  if (note.id == paramsId)  return(
                        <NotesMenuChild
                            noteNames={virtualHeading}
                            dataHeadline={note.headline}
                            key={note.id}
                            id={note.id}
                            paramsId={paramsId}
                            loadNotes={load}
                            loadNote={loadNote}
                            notes={notes}
                            isSearching={isSearching}
                            correctHeadline={virtualHeading}
                            isLoaded={isLoaded}
                            setIsLoaded={setIsLoaded}
                            bin={props.bin}
                            notesListClass={props.notesListClass}
                        />
                    )
                    return (
                      <NotesMenuChild
                            noteNames={virtualHeading}
                            dataHeadline={note.headline}
                            key={note.id}
                            id={note.id}
                            paramsId={paramsId}
                            loadNotes={load}
                            loadNote={loadNote}
                            notes={notes}
                            isSearching={isSearching}
                            correctHeadline={note.headline}
                            isLoaded={isLoaded}
                            setIsLoaded={setIsLoaded}
                            bin={props.bin}
                            notesListClass={props.notesListClass}
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
