import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react';


const propTypes = {
  data: PropTypes.string
}

function Ticket(props) {

  return (
    <div id="ticket">
      <QRCode value="asdfasdfasdfasdfasdsdfasdfasdfasdfasfsad" />
    </div>
  )
}

Ticket.propTypes = propTypes

Ticket.defaultProps = {
  data: 'No apply'
}

export default Ticket
