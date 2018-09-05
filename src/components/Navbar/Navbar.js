import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core"
import Logo from '../../assets/cusurlogo.jpg'

const propTypes = {
  userName: PropTypes.string,
  isLoggedIn: PropTypes.bool
}

function NavbarComponent(props) {
  let navbarBody = (
    <Button className={Classes.MINIMAL} icon="log-in" text="Entrar" onClick={() => { props.history.push('/login') }}/>
  )
  
  if (props.isLoggedIn) {
    navbarBody = (
      <React.Fragment>
        <NavbarHeading>{props.userName}</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="user" text="Mi perfil" />
        <Button className={Classes.MINIMAL} icon="log-out" text="Salir" />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <div className="clickable" onClick={() => { props.history.push('/') }}>
            <img src={Logo} alt="Centro Universitario del Sur" width="45" height="45"/>
          </div>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          {navbarBody}
        </NavbarGroup>
      </Navbar>
    </React.Fragment>
  )
}

NavbarComponent.propTypes = propTypes

NavbarComponent.defaultProps = {
  userName: 'Testing',
  isLoggedIn: true
}



export default withRouter(NavbarComponent)
