import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css'
import Root from './Root'
import EventStore from './store/EventStore'
import AuthStore from './store/AuthStore'
import { Subscribe } from 'unstated';
import * as moment from 'moment';
import 'moment/locale/es';
import 'sweetalert2/src/sweetalert2.scss'

moment.locale('es');

class App extends Component {

  render() {
    return (
      <Subscribe to={[EventStore, AuthStore]}>
        {(events, auth) => (
          <Root apiProps={{ events: {...events}, auth: {...auth} }}/>
        )}
      </Subscribe>
    );
  }
}

export default App;
