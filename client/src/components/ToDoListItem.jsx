/* eslint-disable react/prop-types */
import Pencil from '../assets/icons/Pencil.svg'
import Bin from '../assets/icons/Bin.svg'



function ToDoListItem(props) {
  return (
    <>
      <div className="toDoListItem">
        <div className="btnAndTextCont">
          <div style={props.priorityCircleSx} className={`priorityCircle ${props.priorityCircleHoverClass}`}></div>
          <p style={{color: props.headlineColor}}>{props.name}</p>
        </div>
        <div className="rightBtnsCont">
          <img src={Pencil} alt="" />
          <img src={Bin} alt="" />
        </div>
      </div>
    </>
  )
}

export default ToDoListItem