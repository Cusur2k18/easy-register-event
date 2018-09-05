import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default class EventDetailContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section>
          <div className="container">
          <h1>Details</h1>
          </div>
        </section>
        <Footer />
        
      </React.Fragment>
    )
  }
}
