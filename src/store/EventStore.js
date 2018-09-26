import React from 'react';
import { Container } from 'unstated';
import Api from '../utils/api';
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
    loadingEventAction: false
  }

  setLoading = loading => {
    this.setState({ loadingEventAction: loading })
  }

  setFilteredEvents = filteredEvents => {
    this.setState({ filteredEvents })
  }

  setTodayEvents = todayEvents => {
    this.setState({ todayEvents })
  }

  getTodayEvents = () => {
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
        this.setTodayEvents(response.data)
        console.log('TCL: AuthStore -> getTodayEvents -> response', response);
      })

  }

  getFilteredEvents = (params = {}) => {
    const filter = JSON.stringify(params)
    this.setLoading(true);
    Api.get('/events?filter=' + filter)
      .then(res => parseReq(res))
      .then(response => {
        this.setLoading(false);
        this.setFilteredEvents(response.data)
        console.log('TCL: AuthStore -> getFilteredEvents -> response', response);
      })
  }
}
