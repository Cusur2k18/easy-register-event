import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import TodayEvents from '../components/TodayEvents/TodayEvents'
import EventList from '../components/EventList/EventList'
import Footer from '../components/Footer/Footer'
import { 
  Divider,
  ControlGroup,
  InputGroup,
  Button,
  HTMLSelect,
  NonIdealState
} from '@blueprintjs/core';
import { Subscribe } from 'unstated';
import AuthStore from '../store/AuthStore'
import EventStore from '../store/EventStore'
import LocalStore from '../store/LocalStore'

export default class HomeContainer extends Component {

  FILTER_OPTIONS = [
    {
      label: 'Buscar por Nombre',
      value: 'name'
    }, 
    {
      label: 'Buscar por Carrera',
      value: 'career'
    }
  ];

  now = new Date()

  state = {
    searchCriteria: 'name'
  }

  onEventDetailHandler = (uuid) => {
    this.props.history.push(`event/${uuid}`)
  }

  componentDidMount = () => {
    this.props.actions.events.getTodayEvents()
    this.props.actions.events.getFilteredEvents()
  }

  handleSearch = (e) => {
    console.log('TCL: HomeContainer -> handleSearch -> e.currentTarget.value', e.currentTarget.value);
    const filter = this.getFilter(e.currentTarget.value)
    console.log('TCL: HomeContainer -> handleSearch -> filter', filter);
    this.props.actions.events.getFilteredEvents(filter)
  }
  
  onHandleCriteriaSearch = (e) => {
    console.log('TCL: HomeContainer -> onHandleCriteriaSearch -> e', e.currentTarget.value);
    this.setState({ searchCriteria: e.currentTarget.value })    
  }

  getFilter = (nameFilter) => {
    const { searchCriteria } = this.state
    if (nameFilter) {
      return {
        where: {
          [searchCriteria]: { like: '%'+ nameFilter +'%' }
        }
      }
    }
    return {}
  }

  render() {
    return (
      <React.Fragment>
        <Subscribe to={[AuthStore]}>
          {auth => (
            <Navbar 
              userName={auth.state.loggedUser.name}
              onLogout={async () => {
                await auth.logout()
                this.props.history.push('login')
              }}
              isLoggedIn={!!auth.state.loggedUser.id}/>
          )}
        </Subscribe>
        <Subscribe to={[EventStore]}>
        {events => (
          <React.Fragment>
            <section>
              <div className="container-fluid p-2 px-md-5 py-md-2">
              <h2>Eventos para hoy <small className="text-muted">{this.now.toLocaleDateString()}</small></h2>
              <Divider />
                <div className="row justify-content-around px-2 px-md-5">
                  {events.state.todayEvents.length ? (
                      <TodayEvents 
                        onEventDetail={this.onEventDetailHandler}
                        events={events.state.todayEvents}
                        />
                    ) 
                    : (<NonIdealState
                      icon="error"
                      title="No hay eventos!"
                      className="my-5"
                      description={(
                        <React.Fragment>
                            <span className="font-weight-bold text-muted">
                              No tenemos eventos para hoy
                            </span>
                        </React.Fragment>
                      )}/>) }
                </div>
              </div>
            </section>
            <section className="soft-gray-background green-top-border pt-3 pb-5">
              <div className="container">
                <h2>Buscar eventos</h2>
                <Divider />
                <div className="col-12 d-flex pt-3">
                  <ControlGroup vertical={false}>
                    <HTMLSelect options={this.FILTER_OPTIONS} onChange={this.onHandleCriteriaSearch} />
                    <InputGroup placeholder="Buscar eventos..." onChange={this.handleSearch} />
                    <Button icon="arrow-right" />
                  </ControlGroup>
                </div>
                <div className="row d-flex justify-content-around">
                  {events.state.filteredEvents.length ? (
                    <EventList 
                    events={events.state.filteredEvents}
                    onEventDetail={this.onEventDetailHandler}/>
                  ):
                  (<NonIdealState
                    icon="error"
                    title="Sin resultados!"
                    className="my-5"
                    description={(
                    <React.Fragment>
                        <span className="font-weight-bold text-muted">
                          No hay eventos con ese criterio
                        </span>
                    </React.Fragment>
                  )}/>)}
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
        </Subscribe>
        <Footer />
      </React.Fragment>
    )
  }
}
