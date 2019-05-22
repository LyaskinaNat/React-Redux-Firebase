import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
  const { notifications } = props;
  console.log(notifications);
  return (
    <div className="section">
      <div className="card z-depth-5">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            { notifications && notifications.map(item =>{
              return <li key={item.id}>
                <span className="green-text">{item.user} </span>
                <span>{item.content}</span>
                <div className="note-date grey-text">{moment(item.time.toDate()).fromNow()}</div>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications