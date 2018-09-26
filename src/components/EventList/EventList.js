import React from 'react'
import PropTypes from 'prop-types'
import { NonIdealState } from '@blueprintjs/core'

const propTypes = {
  events: PropTypes.array,
  onEventDetail: PropTypes.func
}

function EventList(props) {
  let content = (
  <NonIdealState
    icon="error"
    title="Sin Resultados!"
    className="mt-5"
    description={(
      <React.Fragment>
          <span className="font-weight-bold text-danger">
            No hay eventos con ese criterio de busqueda.<br />Intenta de nuevo porfavor.
          </span>
      </React.Fragment>
    )}/>
  )
  if (props.events.length) {
    content = props.events.map((e, i) => {
      return (
        <React.Fragment key={e.id}>
          <div className="col-12 col-md-4 mt-4">
            <div className="card clickable" onClick={() => {props.onEventDetail(e.uuid)}}>
              <img className="card-img-top" src={e.coverImg ? e.coverImg : 'https://via.placeholder.com/150x150'} alt="Card" />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    })
  }
  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

EventList.propTypes = propTypes

EventList.defaultProps = {
  events: Array(15).fill(),
  onEventDetail: () => {}
}

export default EventList
