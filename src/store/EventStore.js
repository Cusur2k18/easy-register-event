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

  getTodayEvents(allEvents) {
    return allEvents.filter( e => {
      return moment(e.startDateTime).isSame(moment().format())
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
        this.setTodayEvents(this.getTodayEvents(response.data))
        console.log('TCL: AuthStore -> getFilteredEvents -> response', response);
      })
  }
}
