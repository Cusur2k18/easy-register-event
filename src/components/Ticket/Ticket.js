import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react';


const propTypes = {
  data: PropTypes.string
}

function Ticket(props) {

  return (
    <div id="ticket" className="col-12 col-md-7 pt-4 px-4 pb-2">
      <div className="row">
        <div className="col-12 col-md-3">
          <QRCode value="asdfasdfasdfasdfasdsdfasdfasdfasdfasfsad" />
        </div>
        <div className="col-12 col-md-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Nombre fecha y hora del evento </li>
            <li className="list-group-item">Usuario</li>
            <li className="list-group-item">Carrera</li>
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
  data: 'No apply'
}

export default Ticket
