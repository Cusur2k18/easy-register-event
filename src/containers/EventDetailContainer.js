import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Ticket from '../components/Ticket/Ticket'
import { 
  Button,
  Card,
  Elevation,
  Divider,
  Callout,
  Position,
  Tooltip,
  Tag,
  Intent,
  NonIdealState
} from "@blueprintjs/core";
import html2canvas from 'html2canvas';
import LocalStore from '../store/LocalStore';
import { Subscribe } from 'unstated';
import AuthStore from '../store/AuthStore'
import * as jsPDF from 'jspdf'
import * as moment from 'moment'
import RCTMarkdown from 'react-markdown';

export default class EventDetailContainer extends Component {

  state = {
    downloadLoading: false
  }

  
  componentDidMount() {
    console.log(this.props)
    this.props.actions.events.getEventByUuid(this.props.match.params.id)
  }
  

  printQRCode = () => {
    this.setState({ downloadLoading: true })
    const input = document.getElementById('ticket')
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 30, 10, 150, 50);
        pdf.save("download.pdf");
        this.setState({ downloadLoading: false })
      })
  }

  enrollUser = eventId => {
    this.props.actions.events.doEnrollment(eventId)
  }

  removeEnrollment = () => {
    this.props.actions.events.deleteEnrollment()
  }

  render() {
    const { loadingRegister, singleEvent } = this.props.actions.events.state;
    const isCurrentUserEnrolled = !!(singleEvent.students && singleEvent.students.find(st => st.studentCode === LocalStore.getUser().studentCode))
    const isEventFinish = moment(singleEvent.endDateTime).isBefore(moment().format())
    let action

    if (LocalStore.getToken() && !isEventFinish) {
      action = (
        <Button
          key="register"
          icon="follower"
          loading={loadingRegister}
          text="Registrarme al evento"
          onClick={() => { this.enrollUser(singleEvent.id) }}
          className="bp3-intent-primary mt-3 mt-md-0"/>)
    }
    if (isCurrentUserEnrolled) {
      action = (
        <Button
          key="erase"
          icon="trash"
          text="Borrar mi registro"
          onClick={this.removeEnrollment}
          className="bp3-intent-danger mt-3 mt-md-0"/>)
    }
    if (isEventFinish && isCurrentUserEnrolled) {
      action = <Button key="print" icon="print" text="Imprimir constancia" className="bp3-intent-success mt-3 mt-md-0" />
    }
    if (isEventFinish && !isCurrentUserEnrolled) {
      action = <h4 className="text-muted text-uppercase">El evento ya termino</h4>
    }

    return (
      <React.Fragment>
        <Subscribe to={[AuthStore]}>
          {auth => (
            <Navbar 
              userName={auth.state.loggedUser.firstName ? `${auth.state.loggedUser.firstName} ${auth.state.loggedUser.lastName} ${auth.state.loggedUser.mLastName}`: ''}
              onLogout={async () => {
                await auth.logout()
                this.props.history.push('/login')
              }}
              isLoggedIn={!!LocalStore.getToken()}/>
          )}
        </Subscribe>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 my-5">
                <Card elevation={Elevation.THREE}>
                  <h5>{singleEvent.name}</h5>
                  <Divider />
                  <div className="row">
                    <div className="col-12 mt-3" width="100%">
                      <img src={singleEvent.coverImg ? singleEvent.coverImg : 'https://via.placeholder.com/350x80' } alt={singleEvent.name} className="img-fluid border-green" width="100%"/>
                    </div>
                    <div className="col-12 col-md-8 pt-3 pl-3">
                      <blockquote className="bp3-blockquote">
                        <span className="font-weight-bold">DATOS DEL EVENTO:</span>
                      </blockquote>
                      <div className="mt-4 mt-md-5">
                        <RCTMarkdown source={singleEvent.description} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 pt-3">
                      <blockquote className="bp3-blockquote">
                        <span className="font-weight-bold">OTRA INFORMACION:</span>
                      </blockquote>
                      <Callout title="" className="mt-3 mt-md-5">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item font-weight-bold">Fecha de Inicio:</li>
                          <li className="list-group-item">{moment(singleEvent.startDateTime).format('dddd DD MMM YYYY hh:mm a')}</li>
                          <li className="list-group-item font-weight-bold">Fecha de Finalizacion:</li>
                          <li className="list-group-item">{moment(singleEvent.endDateTime).format('dddd DD MMM YYYY hh:mm a')}</li>
                          <li className="list-group-item font-weight-bold">Personas registradas al evento:</li>
                          <li className="list-group-item">
                            <Tag
                              intent={Intent.SUCCESS}
                              round>
                              {singleEvent.students && singleEvent.students.length}
                            </Tag>
                          </li>
                        </ul>
                      </Callout>
                    </div>
                    <div className="col-12 mt-3 pl-3 pt-3 green-top-border">
                    {!!LocalStore.getToken() ? (
                      isCurrentUserEnrolled ? (
                        <React.Fragment>
                          <blockquote className="bp3-blockquote mb-4">
                            <span className="font-weight-bold">TU BOLETO:</span>
                              <Tooltip content="Descarga tu boleto" position={Position.TOP} hoverCloseDelay={100} className="float-right">
                                <Button icon="download" className="bp3-intent-primary" loading={this.state.downloadLoading} onClick={this.printQRCode}/>
                              </Tooltip>
                          </blockquote>
                          <div className="d-flex justify-content-center">
                            <Ticket />
                          </div>
                        </React.Fragment>
                        ) : (<NonIdealState
                              icon="blocked-person"
                              title="Sin registro"
                              className="mt-2"
                              description={(
                                <React.Fragment>
                                    <span className="font-weight-bold text-danger">
                                      No estas registrado a este evento
                                    </span>
                                </React.Fragment>
                              )}/>)
                    ) : (<NonIdealState
                      icon="log-in"
                      title="Ups!!"
                      className="mt-3"
                      description={(
                        <React.Fragment>
                            <span className="font-weight-bold text-danger">
                              Inicia sesion para poder registrarte a un evento <br/><br/><br/>
                              <Button text="Iniciar Sesion" className="bp3-intent-primary mt-3 mt-md-0" onClick={() => {this.props.history.push('/login')}}/>
                            </span>
                        </React.Fragment>
                      )}/>)}
                    
                    </div>
                  </div>
                  <div className="row flex-column flex-sm-row justify-content-between justify-content-md-around green-top-border px-3 px-md-0 pt-3 mt-5">
                    { action }
                    
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}
