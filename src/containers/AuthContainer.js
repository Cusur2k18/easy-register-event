import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { 
  Button, 
  Card, 
  Elevation,
  Divider,
  FormGroup,
  InputGroup } from "@blueprintjs/core"
import { Link } from 'react-router-dom'

export default class AuthContainer extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    console.log('submitted')
    this.props.history.push('/')
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar isLoggedIn={false}/>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <Card elevation={Elevation.TWO}>
                <h5 className="text-uppercase">Inicia Sesion</h5>
                <Divider />
                <form className="p-5" onSubmit={this.handleLogin}>
                  <FormGroup
                    label="Codigo"
                    labelFor="code-input">
                      <InputGroup id="code-input" placeholder="Codigo de estudiante"  />
                  </FormGroup>
                  <FormGroup
                    label="NIP"
                    labelFor="nip-input"
                    className="mt-4">
                      <InputGroup id="nip-input" placeholder="NIP" />
                  </FormGroup>
                  <Button rightIcon="tick" className="bp3-intent-success" type="submit">Entrar</Button>
                  &nbsp;&nbsp;<Link to="/">Regresar al inicio</Link>
                </form>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}
