import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import TodayEvent from '../components/TodayEvent/TodayEvent'
import EventList from '../components/EventList/EventList'
import Footer from '../components/Footer/Footer'
import { 
  Divider,
  ControlGroup,
  InputGroup,
  Button,
  HTMLSelect } from '@blueprintjs/core';

export default class HomeContainer extends Component {

  FILTER_OPTIONS = ['Buscar por Nombre', 'Buscar por Carrera'];
  now = new Date()

  onEventDetailHandler = () => {
    this.props.history.push('event/3abe0fae-a0a7-4f92-95f1-ac3a03384a28')
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section>
          <div className="container-fluid p-3 p-md-5">
            <h2>Eventos para hoy <small className="text-muted">{this.now.toLocaleDateString()}</small></h2>
            <Divider />
            <div className="row justify-content-around px-2 px-md-5">
              <TodayEvent onEventDetail={this.onEventDetailHandler}/>
              <TodayEvent onEventDetail={this.onEventDetailHandler}/>
              <TodayEvent onEventDetail={this.onEventDetailHandler}/>
              <TodayEvent onEventDetail={this.onEventDetailHandler}/>
            </div>
          </div>
        </section>
        <section className="soft-gray-background green-top-border pt-3 pb-5">
          <div className="container">
            <h2>Buscar eventos</h2>
            <Divider />
            <div className="col-12 d-flex pt-3">
              <ControlGroup vertical={false}>
                <HTMLSelect options={this.FILTER_OPTIONS} />
                <InputGroup placeholder="Buscar eventos..." />
                <Button icon="arrow-right" />
              </ControlGroup>
            </div>
            <div className="row d-flex justify-content-around">
              <EventList 
                onEventDetail={this.onEventDetailHandler}/>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}
