/* eslint-disable react/prop-types */
import documentImg from "../assets/icons/document.svg";
import binBlack from "../assets/icons/binBlack.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteNote, getNote, patchNoteImg } from "../models/notes";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Files from "react-files";
import { checkIfImgExists } from "../functions/functions";

function NotesMenuChild(props) {
  const {
    noteNames,
    paramsId,
    id,
    dataHeadline,
    loadNotes,
    loadNote,
    isSearching,
    correctHeadline,
    isLoaded,
    setIsLoaded,
  } = props;
  let navigate = useNavigate();
  const [notesPic, setNotesPic] = useState();
  const [notesPicUrl, setNotesPicUrl] = useState();
  const auth = useAuthUser();

  const determineRightHeadline = async () => {
    if (!isSearching) return loadNotes();
  };

  const navToPageById = () => {
    // if (paramsId == id) return
    setIsLoaded(false)
    setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    loadNote();
    navigate(`/notes/${id}`);
    document.cookie = `${auth.username}=${auth.username}; SameSite=None`;
    document.cookie = `${auth.username}NoteId=${id}; SameSite=None`;
  };

  const handleDeleteNote = async () => {
    const deletedNote = await deleteNote(auth.id, id);
    if (deletedNote.status == 200) {
      const notesArr = deletedNote.data;
      let index;
      notesArr.forEach((note, i) => {
        if (i == 0) {
          return (index = note.id);
        }
      });
      if (id == paramsId) {
        document.cookie = `${auth.username}=${auth.username}; SameSite=None`;
        document.cookie = `${auth.username}NoteId=${index}; SameSite=None`;
        navigate(`/notes/${index}`);
      }
      loadNotes();
      loadNote();
    }
  };

  const getImage = async (file) => {
    const fileObj = file[0];
    const img = URL.createObjectURL(fileObj);
    console.log(img);
    handlePatchImage(fileObj);
  };

  const handlePatchImage = async (file) => {
    const data = new FormData();
    data.append("notesPic", file);

    const img = await patchNoteImg(id, data).catch((err) => {
      console.log(err.response.data.msg);
    });

    if (img.status == 200) {
      setNotesPicUrl(img.data.image);
    }
  };

  const loadImg = async () => {
    const img = await getNote(id);
    if (img.status == 200) {
      setNotesPic(img.data.image);
      checkIfImgExists(setNotesPicUrl, img.data.image, documentImg);
    }
  };

  useEffect(() => {
    determineRightHeadline();
    // console.log(`noteNames: ${noteNames} data: ${dataHeadline}`)
  }, [noteNames, dataHeadline, isSearching, auth.id, id]);

  useEffect(() => {
    loadImg();
  }, [notesPicUrl]);

  return (
    <>
      <div className="notesList" style={{display: isLoaded ? "flex" : "none"}}>
        <div className="leftCont">
          <div className="imgCont">
            <img src={notesPicUrl} />
            <Files
              className="notesInput"
              accepts={["image/*"]}
              maxFileSize={5000000}
              minFileSize={0}
              name="notesPic"
              onChange={getImage}
            ></Files>
          </div>
          <div className="midCont" onClick={navToPageById}>
            <p>{correctHeadline ? correctHeadline : "Untitled"}</p>
          </div>
        </div>
        <div className="rightCont">
          <img
            className="bin"
            src={binBlack}
            onClick={handleDeleteNote}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default NotesMenuChild;
