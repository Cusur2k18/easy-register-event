import React from 'react';
import { Container } from 'unstated';
import Api from '../utils/api';
import parseReq from '../utils/parseRequest';
import { Alert } from '../components/Alert/Alert'
import { Intent } from '@blueprintjs/core'
import LocalStore from './LocalStore'

export default class AuthStore extends Container {
  state = {
    filteredEvents: [],
    singleEvent: {},
    loadingEventAction: false
  }

  setLoading = loading => {
    this.setState({ loadingEventAction: loading })
  }

  getFilteredEvents = (params = {}) => {
    const filter = JSON.stringify(params)
    this.setLoading(true);
    Api.get('/events?filter=' + filter)
      .then(res => parseReq(res))
      .then(response => {
        this.setLoading(false);
        console.log('TCL: AuthStore -> getFilteredEvents -> response', response);
      })
  }
}
