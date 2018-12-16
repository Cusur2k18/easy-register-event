import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { 
  Button, 
  Card, 
  Elevation,
  Divider,
  FormGroup,
  InputGroup
} from '@blueprintjs/core'
import { Redirect } from 'react-router-dom'
import { Subscribe } from 'unstated';
import AuthStore from '../store/AuthStore'
import { getQueryString } from '../utils/getQuerystring'


export default class AuthContainer extends Component {
  state = {
    userCode: null,
    nip: null,
    shouldRedirect: null,
    uuid: null
  }

  componentDidMount = () => {
    const shouldRedirect = getQueryString(this.props.location.search)
    this.setState({ shouldRedirect: shouldRedirect.hasOwnProperty('redirect_detail'), uuid: shouldRedirect.redirect_detail })
  };
  

  setUserCode = e => {
    this.setState({ userCode: e.target.value })
  }

  setUserNip = e => {
    this.setState({ nip: e.target.value })
  }

  render() {
    const redirectTo = this.state.shouldRedirect ? `/event/${this.state.uuid}` : '/'
    return (
      <Subscribe to={[AuthStore]}>
      {auth => (
        <React.Fragment>
          {auth.state.loggedUser.hasOwnProperty('id') ? <Redirect to={redirectTo}/>
          : <React.Fragment>
              <div>
                <Navbar isLoggedIn={false} onLoginPage={true}/>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-12">
                    <Card elevation={Elevation.TWO}>
                      <h5 className="text-uppercase">Inicia Sesion</h5>
                      <Divider />
                      <form className="p-5" onSubmit={(e) => {
                        e.preventDefault();
                        auth.login(this.state.userCode, this.state.nip)
                      }}>
                        <FormGroup
                          label="Codigo"
                          labelFor="code-input">
                            <InputGroup id="code-input" placeholder="Codigo de estudiante" onChange={this.setUserCode} autoComplete="username"  />
                        </FormGroup>
                        <FormGroup
                          label="NIP"
                          labelFor="nip-input"
                          className="mt-4">
                            <InputGroup id="nip-input" placeholder="NIP" type="password" onChange={this.setUserNip} autoComplete="current-password" />
                        </FormGroup>
                        <Button 
                          rightIcon="tick"
                          className="bp3-intent-success"
                          type="submit"
                          loading={auth.state.loginLoading}>
                            Entrar
                          </Button>
                      </form>
                    </Card>
                  </div>
                </div>
              </div>
              <Footer />
            </React.Fragment>
          }
          
        </React.Fragment>
      )}
      </Subscribe>
    )
  }
}
