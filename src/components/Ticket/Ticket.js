import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react';
import * as moment from 'moment';

const propTypes = {
  data: PropTypes.object,
  event: PropTypes.object,
  user:  PropTypes.object
}

function Ticket(props) {
  
  const qrData = {
    enrollId: props.data.id
  }

  return (
    <div id="ticket" className="col-12 col-md-7 pt-4 px-4 pb-2">
      <div className="row">
        <div className="col-12 col-md-3 text-center">
          <QRCode value={JSON.stringify(qrData)} />
        </div>
        <div className="col-12 col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{props.event.name} <br /> {moment(props.event.startDateTime).format('dd d MMM YY hh:mm a')} - {moment(props.event.endDateTime).format('dd d MMM YY hh:mm a')}</li>
            <li className="list-group-item">{`${props.user.firstName} ${props.user.lastName} ${props.user.mLastName}`}</li>
            <li className="list-group-item">{props.event.location}</li>
            <li className="list-group-item">{props.event.career}</li>
          </ul>
        </div>
        <div className="col-12 d-flex justify-content-end mt-1">
          <small>* Recuerda llevar esto si no tu asistencia no contara</small>
        </div>
      </div>
    </div>
  )
}

Ticket.propTypes = propTypes

Ticket.defaultProps = {
  data: {},
  event: {},
  user: {}
}

export default Ticket
