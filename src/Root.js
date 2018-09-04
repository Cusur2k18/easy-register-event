import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'

export default class Root extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={HomeContainer} />
      </Switch>
    )
  }
}
