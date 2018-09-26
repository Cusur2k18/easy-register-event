import React from 'react';
import { Container } from 'unstated';
import Api from '../utils/api';
import parseReq from '../utils/parseRequest';
import { Alert } from '../components/Alert/Alert'
import { Intent } from '@blueprintjs/core'
import LocalStore from './LocalStore'


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
    const tokenParams = new URLSearchParams(`access_token=${LocalStore.getToken()}`);
    console.log('TCL: AuthStore -> logout -> tokenParams', tokenParams);
    await LocalStore.clear()
    this.setState({
      loggedUser: LocalStore.getUser(),
      loginLoading: false
    })
    // Api.post('/students/logout', { params: tokenParams })
    //   .then(res => parseReq(res))
    //   .then( response => {
    //     console.log('TCL: AuthStore -> logout -> response', response);
    //     LocalStore.clear()
    //   })
    //   .catch(err => {
    //     const error = parseReq({ err });
    //     LocalStore.clear()
    //     Alert.show({ message: error.error, intent: Intent.DANGER, icon: 'warning-sign' })
    //   })
  }
}
