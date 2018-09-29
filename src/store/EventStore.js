import React from 'react';
import { Container } from 'unstated';
import Api from '../utils/api';
import SecureApi from '../utils/api-secure';
import parseReq from '../utils/parseRequest';
import { Alert } from '../components/Alert/Alert'
import { Intent } from '@blueprintjs/core'
import LocalStore from './LocalStore'
import swal from 'sweetalert2'
import * as moment from 'moment'

export default class AuthStore extends Container {
  state = {
    filteredEvents: [],
    todayEvents: [],
    singleEvent: {},
    currentEnrollment: {},
    loadingAllEvents: false,
    loadingTodayEvents: false,
    loadingSingle: false,
    loadingAction: false
  }


  /**
   * Loadings
   * @memberOf AuthStore
   */
  setTodayLoading = loadingTodayEvents => {
    this.setState({ loadingTodayEvents })
  }

  setAllLoading = loadingAllEvents => {
    this.setState({ loadingAllEvents })
  }

  setSingleLoading = loadingSingle => {
    this.setState({ loadingSingle })
  }

  setloadingAction = loadingAction => {
    this.setState({ loadingAction })
  }


  /**
   * Set properties
   * @memberOf AuthStore
   */
  setFilteredEvents = filteredEvents => {
    this.setState({ filteredEvents })
  }

  setTodayEvents = todayEvents => {
    this.setState({ todayEvents })
  }

  setSingleEvent = singleEvent => {
    const currentEnrollment = LocalStore.getEnrollments().find(er => er.eventId === singleEvent.id)
    this.setState({ singleEvent, currentEnrollment })
  }

  getTodayEvents = () => {
    this.setTodayLoading(true)
    const now = moment().format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'd').format('YYYY-MM-DD');
    const filter = JSON.stringify({
      where: {
        and: [
          {
            startDateTime: { gte: now }
          },
          {
            startDateTime: { lt: tomorrow }
          }
        ]
      }
    })
    Api.get('/events?filter=' + filter)
      .then(res => parseReq(res))
      .then(response => {
        this.setTodayLoading(false)
        this.setTodayEvents(response.data)
        console.log('TCL: AuthStore -> getTodayEvents -> response', response);
      })

  }

  getFilteredEvents = (params = {}) => {
    const filter = JSON.stringify(params)
    this.setAllLoading(true);
    Api.get('/events?filter=' + encodeURIComponent(filter))
      .then(res => parseReq(res))
      .then(response => {
        this.setAllLoading(false);
        this.setFilteredEvents(response.data)
        console.log('TCL: AuthStore -> getFilteredEvents -> response', response);
      })
  }

  getEventByUuid = uuid => {
    const filter = JSON.stringify({ where: { uuid }, include: 'students'})
    this.setSingleLoading(true)
    Api.get('/events/findOne?filter=' + filter)
      .then(res => parseReq(res))
      .then(response => {
        this.setSingleEvent(response.data)
        this.setSingleLoading(false);
        console.log('TCL: AuthStore -> getEventByUuid -> response', response);
      })
  }

  getEventById = id => {
    const filter = JSON.stringify({ include: 'students'})
    this.setSingleLoading(true)
    Api.get(`/events/${id}?filter=${filter}`)
      .then(res => parseReq(res))
      .then(response => {
        this.setSingleEvent(response.data)
        this.setSingleLoading(false);
        console.log('TCL: AuthStore -> getEventById -> response', response);
      })
  }

  doEnrollment = eventId => {
    const userId = LocalStore.getUser().id
    this.setloadingAction(true);
    SecureApi.post('/enrollments', { eventId, userId })
      .then(res => parseReq(res))
      .then(response => {
        console.log('TCL: AuthStore -> doEnrollment -> response', response);
        LocalStore.setEnrollments([...LocalStore.getEnrollments(), response.data])
        this.setloadingAction(false)
        swal({
          title: 'Listo!',
          text: 'Tu registro esta hecho! Te esperamos en el evento, \n No olvide imprimir tu boleto y llevarlo o no obtendras asistencia.',
          type: 'success',
          onClose: () => {
            this.getEventById(eventId)
          }
        })
      })
  }

  deleteEnrollment = () => {
    swal({
      title: '¿Estas seguro que quieres borrar tu registro a este evento?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si estoy seguro! Borra mi registro',
      cancelButtonText:'No! no borres mi registro'
    }).then((result) => {
     if (result.value) {
      const { singleEvent } = this.state;
      const allEnrollments = LocalStore.getEnrollments()
      const singleEnrollment = allEnrollments.find( e => e.eventId === singleEvent.id )
      if (singleEnrollment) {
        LocalStore.setEnrollments(allEnrollments.filter(er => er.id !== singleEnrollment.id))
        this.setloadingAction(true);
        SecureApi.delete(`/enrollments/${singleEnrollment.id}`)
          .then(res => parseReq(res))
          .then(response => {
            console.log('TCL: AuthStore -> deleteEnrollment -> response', response);
            this.setloadingAction(false);
            swal({
              title: 'Listo!',
              text: 'Tu registro se borro!',
              type: 'success',
              onClose: () => {
                this.getEventById(singleEvent.id)
              }
            })
          })
      }
     }
    })
  }
}
