import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  SendMessage
} from '../redux/action/chat'

class App extends Component {

  componentDidMount() {
    const { SendMessage } = this.props
    SendMessage('Welcome to React')
  }

  render() {
    const { chatty } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{chatty.message}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatty: state.chat
})

const mapDispatchToProps = dispatch => bindActionCreators({
  SendMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
