import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from './containers/LandingPage'
import Places from './containers/Places'
import Chat from './containers/Chat'
import PageContent from './components/PageContent'
import FileReader from './containers/FileReader'

import SideBar from './components/SideBar'
// import PageContent from '../components/PageContent'
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
    const { match } = this.props
    return(
      <div id="wrapper" className={classnames({ toggled })}>
        <SideBar/>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <Route path={`${match.url}/dashboard`} component={PageContent}/>
            <Route path={`${match.url}/places`} component={Places}/>
            <Route path={`${match.url}/chatty`} component={Chat}/>
            <Route path={`${match.url}/filereader`} component={FileReader}/>
          </div>
        </div>
      </div>
    )
  }
}

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/portal' component={Pages}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}