import React, { Component } from 'react'
import SideBar from '../components/SideBar'
import PageContent from '../components/PageContent'
import classnames from 'classnames'

class Pages extends Component {
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
    const { toggled } = this.state
    return(
      <div id="wrapper" className={classnames({ toggled })}>
        <SideBar />
        <PageContent toggleMenu={this.toggleMenu.bind(this)} />
      </div>
    )
  }
}

export default Pages