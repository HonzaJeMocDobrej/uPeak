/* eslint-disable react/prop-types */
import '../styles/styles.css'
import binBlack from '../assets/icons/binBlack.svg'
import magnifyingGlass from '../assets/icons/magnifyingGlass.svg'
import plus from '../assets/icons/plus.svg'
import threeDots from '../assets/icons/threeDots.svg'


const NotesRightMenu = (props) => {

    const { noteNames } = props

  return (
    <>
        <div className="notesMenu">
            <div className="topCont">
                <div className="item">
                    <img src={plus} alt="" />
                    <p>New Note</p>
                </div>
                <div className="item">
                    <img src={magnifyingGlass} alt="" />
                    <p>Search</p>
                </div>
            </div>
            <div className="bottomCont">
                    <p className='myNotes'>My Notes</p>
                <div className="notesList">
                    <div className="leftCont">
                        <span>✅</span>
                        <p>{noteNames === '' ? 'Untitled' : noteNames }</p>
                    </div>
                    <div className="rightCont">
                        <img className='threeDots' src={threeDots} alt="" />
                        <img className='bin' src={binBlack} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default NotesRightMenu;