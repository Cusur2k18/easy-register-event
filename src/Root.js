import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LocalStore from './store/LocalStore'

import HomeContainer from './containers/HomeContainer'
import AuthContainer from './containers/AuthContainer'
import EventDetailContainer from './containers/EventDetailContainer'

export default class Root extends Component {

  componentDidMount = () => {
    if (LocalStore.getUser().id) {
      this.props.apiProps.events.getAllUserEnrollments(LocalStore.getUser().id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.apiProps.auth.state.loggedUser.id !== this.props.apiProps.auth.state.loggedUser.id && this.props.apiProps.auth.state.loggedUser.id) {
      this.props.apiProps.events.getAllUserEnrollments(this.props.apiProps.auth.state.loggedUser.id) 
    }
  }
  
  render() {
    return (
      <Switch>
        <Route path="/" exact render={(props) => <HomeContainer {...props} actions={this.props.apiProps} />} />
        <Route path="/event/:id" render={(props) => <EventDetailContainer {...props} actions={this.props.apiProps}/>}  />
        <Route path="/login" component={AuthContainer} />
        <Redirect to="/" />
      </Switch>
    )
  }
}
