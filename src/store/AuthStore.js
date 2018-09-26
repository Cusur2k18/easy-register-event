import React from 'react';
import { Container } from 'unstated';
import Api from '../utils/api';
import parseReq from '../utils/parseRequest';
import { Alert } from '../components/Alert/Alert'
import { Intent } from '@blueprintjs/core'
import LocalStore from './LocalStore'
import * as Qs from 'qs'


export default class AuthStore extends Container {
  state = {
    loggedUser: LocalStore.getUser(),
    loginLoading: false,
    toLogout: false
  };

  setUser = user => {
    this.setState({ loggedUser: user });
  }
  
  setLoading = loading => {
    this.setState({ loginLoading: loading })
  }

  login = (studentCode, nip) => {
    this.setLoading(true)
    Api.post('/students/signin', { studentCode, nip })
      .then(res => parseReq(res))
      .then( response => {
        console.log('TCL: AuthStore -> login -> response', response);
        this.setUser(response.data.user)
        LocalStore.setUser(response.data.user)
        LocalStore.setToken(response.data.id)
        this.setLoading(false)
      })
      .catch(err => {
        const error = parseReq({ err });
        this.setLoading(false)
        Alert.show({ message: error.error, intent: Intent.DANGER, icon: 'warning-sign' })
      })
  }

  logout = async () => {
    await LocalStore.clear()
    this.setState({
      loggedUser: LocalStore.getUser(),
      loginLoading: false
    })
    // Api.post(`/students/logout`, Qs.stringify({ access_token: LocalStore.getToken() }) )
    //   .then(res => parseReq(res))
    //   .then( async (response) => {
    //     console.log('TCL: AuthStore -> logout -> response', response);
       
    //   })
    //   .catch(async (err) => {
    //     const error = parseReq({ err });
    //     await LocalStore.clear()
    //     this.setState({
    //       loggedUser: LocalStore.getUser(),
    //       loginLoading: false
    //     })
    //     Alert.show({ message: error.error, intent: Intent.DANGER, icon: 'warning-sign' })
    //   })
  }
}
