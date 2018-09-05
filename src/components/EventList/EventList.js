import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  events: PropTypes.array,
  onEventDetail: PropTypes.func
}

function EventList(props) {
  const eventList = props.events.map((e, i) => {
    return (
      <React.Fragment key={i}>
        <div className="col-12 col-md-4 mt-4">
          <div className="card clickable" onClick={props.onEventDetail}>
            <img className="card-img-top" src="https://via.placeholder.com/150x150" alt="Card" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  })
  return (
    <React.Fragment>
      {eventList}
    </React.Fragment>
  )
}

EventList.propTypes = propTypes

EventList.defaultProps = {
  events: [1,2,3,4,5],
  onEventDetail: () => {}
}

export default EventList
