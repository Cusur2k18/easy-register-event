import React from 'react'
import PropTypes from 'prop-types'
import { truncate } from '../../utils/truncate'
import RCTMarkdown from 'react-markdown';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, Divider } from "@blueprintjs/core";
import * as moment from 'moment';
import transformImage from '../../utils/transformImage'

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
              <img src={event.cover ? transformImage(event.cover, ['w_650', 'h_450']) : 'https://via.placeholder.com/350x150'} className="today-image" />
              <div className="legend">
                <h5>{event.name}</h5>
                <Divider />
                <p>Empieza: <b>{moment.utc(event.start_date).format('ll')} - {moment.utc(event.start_date).format('h:mm a')}</b></p>
                <p>Termina: <b>{moment.utc(event.end_date).format('ll')} - {moment.utc(event.end_date).format('h:mm a')}</b></p>
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
