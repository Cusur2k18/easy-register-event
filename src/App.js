import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css'
import Root from './Root'
import EventStore from './store/EventStore'
import { Subscribe } from 'unstated';


class App extends Component {

  render() {
    return (
      <Subscribe to={[EventStore]}>
        {events => (
          <Root apiProps={{ events }}/>
        )}
      </Subscribe>
    );
  }
}

export default App;
