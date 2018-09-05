import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import TodayEvent from '../components/TodayEvent/TodayEvent'
import EventList from '../components/EventList/EventList'
import { 
  Divider,
  ControlGroup,
  InputGroup,
  Button,
  HTMLSelect } from '@blueprintjs/core';

export default class HomeContainer extends Component {

  FILTER_OPTIONS = ["Nombre", "Carrera"];
  now = new Date()

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar />
        </div>
        <section>
          <div className="container-fluid p-5">
            <h2>Eventos para hoy <small className="text-muted">{this.now.toLocaleDateString()}</small></h2> <a href="">Ver mas</a>
            <Divider />
            <div className="row justify-content-around">
              <TodayEvent />
              <TodayEvent />
              <TodayEvent />
              <TodayEvent />
            </div>
          </div>
        </section>
        <section className="soft-gray-background green-top-border py-3">
          <div className="container">
            <h2>Busca mas eventos</h2>
            <Divider />
            <div className="col-12 d-flex pt-3">
              <ControlGroup vertical={false}>
                <HTMLSelect options={this.FILTER_OPTIONS} />
                <InputGroup placeholder="Buscar eventos..." />
                <Button icon="arrow-right" />
              </ControlGroup>
            </div>
            <div className="row d-flex justify-content-around">
              <EventList />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}
