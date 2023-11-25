/* eslint-disable react/prop-types */
import PriorityLightningDef from '../assets/icons/PriorityLightningDef.svg'
import Pencil from '../assets/icons/Pencil.svg'
import Bin from '../assets/icons/Bin.svg'



function ToDoListItem(props) {
  return (
    <>
      <div className="toDoListItem">
        <div className="btnAndTextCont">
          <div style={props.priorityCircleSx} className={`priorityCircle ${props.priorityCircleHoverClass}`}></div>
          <p>{props.name}</p>
        </div>
        <div className="rightBtnsCont">
          <img src={PriorityLightningDef} alt="" />
          <img src={Pencil} alt="" />
          <img src={Bin} alt="" />
        </div>
      </div>
    </>
  )
}

export default ToDoListItem