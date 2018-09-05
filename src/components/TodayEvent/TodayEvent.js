import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onEventDetail: PropTypes.func
}

function TodayEvent(props) {
  return (
    <React.Fragment>
      <div className="col-12 col-sm-12 col-md-3 mt-3" onClick={props.onEventDetail}>
        <div className="card clickable">
          <img className="card-img-top" src="https://via.placeholder.com/350x150" alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

TodayEvent.propTypes = propTypes

TodayEvent.defaultProps = { 
  onEventDetail: () => {}
}


export default TodayEvent
