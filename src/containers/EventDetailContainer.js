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
  Tooltip
} from "@blueprintjs/core";
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'

export default class EventDetailContainer extends Component {

  state = {
    downloadLoading: false
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

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 my-5">
                <Card elevation={Elevation.THREE}>
                  <h5>Nombre del evento</h5>
                  <Divider />
                  <div className="row">
                    <div className="col-12 mt-3">
                      <img src="https://via.placeholder.com/350x80" alt="Event chido" className="img-fluid border-green" width="100%" />
                    </div>
                    <div className="col-12 col-md-8 pt-3 pl-3">
                      <blockquote className="bp3-blockquote">
                        <span className="font-weight-bold">DATOS DEL EVENTO:</span>
                      </blockquote>
                      <ul className="list-group list-group-flush mt-3 mt-md-5">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-4 pt-3">
                      <blockquote className="bp3-blockquote">
                        <span className="font-weight-bold">HORARIOS:</span>
                      </blockquote>
                      <Callout title="Visually important content" className="mt-3 mt-md-5">
                        The component is a simple wrapper around the CSS API that provides props for modifiers and optional
                        title element. Any additional HTML props will be spread to the rendered
                        element.
                      </Callout>
                    </div>
                    <div className="col-12 mt-3 pl-3 pt-3 green-top-border">
                      <blockquote className="bp3-blockquote mb-4">
                        <span className="font-weight-bold">TU BOLETO:</span>
                          <Tooltip content="Descarga tu boleto" position={Position.TOP} hoverCloseDelay={100} className="float-right">
                            <Button icon="download" className="bp3-intent-primary" loading={this.state.downloadLoading} onClick={this.printQRCode}/>
                          </Tooltip>
                      </blockquote>
                      <div className="d-flex justify-content-center">
                        <Ticket />
                      </div>
                    </div>
                  </div>
                  <div className="row flex-column flex-sm-row justify-content-between justify-content-md-around green-top-border px-3 px-md-0 pt-3 mt-5">
                    <Button icon="follower" text="Registrarme al evento" className="bp3-intent-primary mt-3 mt-md-0"/>
                    <Button icon="print" text="Imprimir constancia" className="bp3-intent-success mt-3 mt-md-0" />
                    <Button icon="trash" text="Borrar mi registro" className="bp3-intent-danger mt-3 mt-md-0"/>
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
