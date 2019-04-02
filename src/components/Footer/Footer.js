import React from 'react'
import LogoCTA from '../../assets/logocta.png'

function Footer(props) {
  return (
    <div className="justify-content-between justify-content-md-between text-center black-background p-2 footer">
      <div className="footer-left">
        <ul>
          <li>CENTRO UNIVERSITARIO DEL SUR</li>
          <li>Av. Enrique Arreola Silva No. 883, Colonia Centro</li>
          <li>C.P. 49000, Ciudad Guzmán, Jalisco, México</li>
          <li>Teléfono: +52 (341) 575 2222. Fax 01 (341) 5752223</li>
        </ul>
      </div>
      <div className="footer-right">
        <ul>
          <li>Sitio desarrollado por:</li>
          <li>
            <img alt="footer-cta-logo" width="50" height="50" src={LogoCTA} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
