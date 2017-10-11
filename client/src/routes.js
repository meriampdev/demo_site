import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from './containers/LandingPage'
import Pages from './containers/Pages'

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