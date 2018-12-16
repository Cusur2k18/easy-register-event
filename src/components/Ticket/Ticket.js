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
  
  console.log('props', props)
  const qrData = {
    enrollId: props.data.id,
    eventName: props.event.name,
    user: {
      name: props.user.name,
      career: props.user.career
    }
  }

  return (
    <div id="ticket" className="col-12 col-md-6 pt-1 mr-1">
      <div className="row">
        <div className="col-8 dashed-border">
          <ul className="list-group list-group-flush pt-3">
            <li className="list-group-item">Nombre del evento: {props.event.name}</li>
            <li className="list-group-item">
              Fecha del evento: 
              <br /> {moment.utc(props.event.start_date).format('l')} {moment.utc(props.event.start_date).format('h:mma')}
              &nbsp;al {moment.utc(props.event.end_date).format('l')} {moment.utc(props.event.end_date).format('h:mma')}
            </li>
            <li className="list-group-item">Lugar: {props.event.location}</li>
            <li className="list-group-item">Asistente: {props.user.name}</li>
          </ul>
        </div>
        <div className="col-4 text-center">
          <QRCode value={JSON.stringify(qrData)}
            size={180}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"} />
        </div>
      </div>
    </div>
  )
}
//  <div className="col-12 d-flex justify-content-end mt-1">
          // <small>* Recuerda llevar esto si no tu asistencia no contara</small>
        // </div>
Ticket.propTypes = propTypes

Ticket.defaultProps = {
  data: {},
  event: {},
  user: {}
}

export default Ticket
