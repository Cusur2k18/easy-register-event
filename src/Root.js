import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import HomeContainer from './containers/HomeContainer'
import AuthContainer from './containers/AuthContainer'

export default class Root extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomeContainer} />
        <Route path="/login" component={AuthContainer} />
      </Switch>
    )
  }
}
