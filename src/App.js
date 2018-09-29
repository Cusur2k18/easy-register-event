import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css'
import Root from './Root'
import EventStore from './store/EventStore'
import { Subscribe } from 'unstated';
import * as moment from 'moment';
import 'moment/locale/es';
import 'sweetalert2/src/sweetalert2.scss'

moment.locale('es');



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
