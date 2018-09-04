import React from 'react'
import PropTypes from 'prop-types'
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";

const propTypes = {
  userName: PropTypes.string,
  isLoggedIn: PropTypes.bool
}

function NavbarComponent(props) {
  let navbarBody = <Button className={Classes.MINIMAL} icon="log-in" text="Entrar" />
  
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



export default NavbarComponent
