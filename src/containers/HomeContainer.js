import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'

export default class HomeContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar />
        </div>
        <div className="container">
          <h1>hi</h1>
        </div>
      </React.Fragment>
    )
  }
}
