import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomeContainer from './containers/HomeContainer'
import AuthContainer from './containers/AuthContainer'
import EventDetailContainer from './containers/EventDetailContainer'

export default class Root extends Component {
  componentDidMount = () => {
    console.log( this.props )
  }
  
  render() {
    return (
      <Switch>
        <Route path="/" exact render={(props) => <HomeContainer {...props} actions={this.props.apiProps} />} />
        <Route path="/event/:id" component={EventDetailContainer} />
        <Route path="/login" component={AuthContainer} />
        <Redirect to="/" />
      </Switch>
    )
  }
}
