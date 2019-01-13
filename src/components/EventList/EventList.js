import React from 'react'
import PropTypes from 'prop-types'
import { NonIdealState, Divider } from '@blueprintjs/core'
import * as moment from 'moment'
import Pagination from '../Pagination/Pagination'
import transformImage from '../../utils/transformImage'
import defaulttImage from '../../assets/no-image.png'

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
    content = props.events.map((singleEvent, i) => {
      return (
        <React.Fragment key={singleEvent.uuid}>
          <div className="col-12 col-md-4 mt-4">
            <div className="card clickable" onClick={() => {props.onEventDetail(singleEvent.uuid)}}>
              <img className="card-img-top" src={singleEvent.cover ? transformImage(singleEvent.cover, ['w_150', 'h_150']) : defaulttImage} alt="Card" />
              <div className="card-body">
                <h5 className="card-title">{singleEvent.name}</h5>
                <Divider />
                <p>Empieza: <b>{moment.utc(singleEvent.start_date).format('ll')} - {moment.utc(singleEvent.start_date).format('h:mm a')}</b></p>
                <p>Termina: <b>{moment.utc(singleEvent.end_date).format('ll')} - {moment.utc(singleEvent.end_date).format('h:mm a')}</b></p>
                <Divider />
                <div className="card-text m-t-3">
                  <p className="font-weight-bold">Carrera: <span className="text-uppercase">{singleEvent.career}</span></p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    })
  }
  return (
    <React.Fragment>
      <div className="col-12 text-center mt-4 text-md-right">
        <div className="col">
          <Pagination onNext={props.onPaginate} onPrev={props.onPaginate} currentPage={props.currentPage} totalPages={props.totalPages}/>
        </div>
      </div>
      {content}
      <div className="col-12 text-center mt-4 text-md-right">
        <div className="col">
          <Pagination onNext={props.onPaginate} onPrev={props.onPaginate} currentPage={props.currentPage} totalPages={props.totalPages}/>
        </div>
      </div>
    </React.Fragment>
  )
}

EventList.propTypes = propTypes

EventList.defaultProps = {
  events: Array(15).fill(),
  onEventDetail: () => {}
}

export default EventList
