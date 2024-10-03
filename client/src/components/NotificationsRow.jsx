/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import bin from '../assets/icons/Bin.svg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import checkFill from '../assets/icons/checkFill.svg'
import plusFill from '../assets/icons/plusCircleFill.svg'
import clockFill from '../assets/icons/clockFill.svg'
import { patchNotification } from '../models/notifications';

import emojisJSON from '../data/emoji.json'


function NotificationsRow(props) {

    const {isBlack, img, value, time, page, isNotificOpen, getNotific, id} = props

    const [emoji, setEmoji] = useState('😎')


    const formatTime = () => {
        dayjs.extend(relativeTime)
        const timeFromNow = dayjs(time).fromNow()

        return timeFromNow
    }

    const returnRightImg = () => {
        if (page=='Todo') return checkFill
        if (page=='Notes') return plusFill
        if (page=='Pomodoro') return clockFill
    }

    const deleteNotification = async () => {
      await patchNotification(id, [
        {
          'propName': 'isShown',
          'value': false
        }
      ])
      getNotific()
    }

    const chooseRandomEmoji = () => {
      let randomNum = Math.floor(Math.random() * emojisJSON.length)
      setEmoji(emojisJSON[randomNum])
  }

    useEffect(() => {
        formatTime()
        chooseRandomEmoji()
    }, [isNotificOpen])

  return (
    <>
      <div className={`row ${isBlack ? "rowBlack" : ""}`}>
        <div className="topCont">
          <img src={returnRightImg()} className="imgPage" alt="" />
          <div className="rightCont">
            <p className="pInfo" dangerouslySetInnerHTML={{__html: `${value} ${emoji}`}}></p>
            <img onClick={deleteNotification} className="imgBin" src={bin} alt="" />
          </div>
        </div>
        <p className="pTime">{formatTime()}</p>
      </div>
    </>
  );
}

export default NotificationsRow;
