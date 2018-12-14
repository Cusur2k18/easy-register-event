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
    Api.post('/students/login', JSON.stringify({ studentCode, nip}), { headers: {'Content-Type': 'application/json'} })
      .then(res => parseReq(res))
      .then(response => {
        console.log('TCL: AuthStore -> login -> response', response);
        if (response.data.error) {
          this.setLoading(false)
          Alert.show({ message: response.data.error, intent: Intent.DANGER, icon: 'warning-sign' })
          return
        }

        const user = { id: response.data.id, career: response.data.career, name: response.data.name, studentCode: response.data.student_code }
        this.setUser(user)
        LocalStore.setUser(user)
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
  }
}
