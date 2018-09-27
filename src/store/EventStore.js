import React from 'react';
import { Container } from 'unstated';
import Api from '../utils/api';
import SecureApi from '../utils/api-secure';
import parseReq from '../utils/parseRequest';
import { Alert } from '../components/Alert/Alert'
import { Intent } from '@blueprintjs/core'
import LocalStore from './LocalStore'
import * as moment from 'moment'

export default class AuthStore extends Container {
  state = {
    filteredEvents: [],
    todayEvents: [],
    singleEvent: {},
    loadingAllEvents: false,
    loadingTodayEvents: false,
    loadingSingle: false
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
    this.setState({ singleEvent })
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
    Api.get('/events?filter=' + filter)
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

  doEnrollment = eventId => {
    const userId = LocalStore.getUser().id
    SecureApi.post('/enrollments', { eventId, userId })
      .then(res => parseReq(res))
      .then(response => {
        console.log('TCL: AuthStore -> doEnrollment -> response', response);
      })
  }
}
