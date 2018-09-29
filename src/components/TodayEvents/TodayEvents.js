import React from 'react'
import PropTypes from 'prop-types'
import { truncate } from '../../utils/truncate'
import RCTMarkdown from 'react-markdown';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, Divider } from "@blueprintjs/core";
import * as moment from 'moment';

const propTypes = {
  onEventDetail: PropTypes.func,
  events: PropTypes.array
}

function TodayEvents(props) {

  const { events } = props

  return (
    <React.Fragment>
      <Carousel
        autoPlay
        infiniteLoop
        statusFormatter={(c, t) => {`${c} de ${t}`}}>
        {events.map( event => {
          return (
            <div key={event.id} className="clickable" onClick={() => {props.onEventDetail(event.uuid)}}>
              <img src={event.coverImg ? event.coverImg : 'https://via.placeholder.com/350x150'} className="today-image" />
              <div className="legend">
                <h5>{event.name}</h5>
                <Divider />
                <p>Empieza: <b>{moment(event.startDateTime).format('ddd d MMM YYYY hh:mm a')}</b></p>
                <p>Termina: <b>{moment(event.endDateTime).format('ddd d MMM YYYY hh:mm a')}</b></p>
              </div>
            </div>
          )
        })}
      </Carousel>
    </React.Fragment>
  )
}

TodayEvents.propTypes = propTypes

TodayEvents.defaultProps = { 
  onEventDetail: () => {},
  events: []
}


export default TodayEvents
