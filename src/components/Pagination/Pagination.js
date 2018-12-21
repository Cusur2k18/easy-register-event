import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from '@blueprintjs/core'

const propTypes = {
  willPaginate: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
}

function Pagination (props) {
  return (
     props.totalPages > 1 ? (
       <React.Fragment>
        <span className="text-muted mr-2">Pagina {props.currentPage} de {props.totalPages}</span>
        <ButtonGroup>
          <Button icon="chevron-left" onClick={() => props.onPrev(props.currentPage, props.totalPages, 'prev')} disabled={props.currentPage === 1}>Atras</Button>
          <Button rightIcon="chevron-right" onClick={() => props.onNext(props.currentPage, props.totalPages, 'next')} disabled={props.currentPage === props.totalPages}>Siguiente</Button>
        </ButtonGroup>
      </React.Fragment>
      ) : null
  )
}

Pagination.propTypes = propTypes

Pagination.defaultProps = {
  currentPage: 1,
  totalPages: 10,
  onNext: (currentPage, actionType) => {},
  onPrev: (currentPage, actionType) => {}
}

export default Pagination