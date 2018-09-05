import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Button, Card, Elevation, Divider, Callout } from "@blueprintjs/core";


export default class EventDetailContainer extends Component {
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
                      <blockquote class="bp3-blockquote">
                        <span className="font-weight-bold">DATOS DEL EVENTO:</span>
                      </blockquote>
                      <ul className="list-group list-group-flush mt-5">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Morbi leo risus</li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-4 pt-3">
                      <blockquote class="bp3-blockquote">
                        <span className="font-weight-bold">HORARIOS:</span>
                      </blockquote>
                      <Callout title="Visually important content" className="mt-5">
                        The component is a simple wrapper around the CSS API that provides props for modifiers and optional
                        title element. Any additional HTML props will be spread to the rendered
                        element.
                      </Callout>
                    </div>
                  </div>
                  <div className="row justify-content-around green-top-border pt-3 mt-5">
                    <Button icon="follower" text="Registrarme al evento" className="bp3-intent-primary"/>
                    <Button icon="print" text="Imprimir constancia" className="bp3-intent-success"/>
                    <Button icon="trash" text="Borrar mi registro" className="bp3-intent-danger"/>
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
