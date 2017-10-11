import React, { Component } from 'react'

class PageContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggled: true
    }
  }

  toggleMenu() {
    this.setState({ toggled: !this.state.toggled })
  }

  render() {
    return(
      <div id="page-content-wrapper">
        <div className="container-fluid">

            <h1>Simple Sidebar</h1>
            <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens,
              and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear.
              On small screens, the page content will be pushed off canvas.</p>
            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
            <a className="btn btn-secondary" onClick={this.toggleMenu.bind(this)} id="menu-toggle">Toggle Menu</a>
        </div>
      </div>
    )
  }
}

export default PageContent