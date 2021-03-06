import React, { Component } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  LogIn
} from '../redux/action/user'
import {
  LogInChat
} from '../redux/action/chat'

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login_active: true,
      register_active: false
    }
  }

  onClick(activeTab, inactive, e) {
    e.preventDefault()
    this.setState({
      [activeTab]: true,
      [inactive]: false
    })
  }

  render() {
    const { login_active, register_active } = this.state
    const { history, LogIn, LogInChat } = this.props
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-6">
                    <a className={classnames({ active: login_active })}
                      id="login-form-link"
                      onClick={this.onClick.bind(this, 'login_active', 'register_active')}
                    >Login</a>
                  </div>
                  <div className="col-xs-6">
                    <a id="register-form-link"
                      className={classnames({ active: register_active })}
                      onClick={this.onClick.bind(this, 'register_active', 'login_active')}
                    >Register</a>
                  </div>
                </div>
                <hr />
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Login
                      className={classnames({ out: !login_active, in: login_active })}
                      LogIn={LogIn.bind(this)}
                      LogInChat={LogInChat}
                      history={history}
                    />
                    <Register className={classnames({ out: !register_active, in: register_active })} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  chatty: state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  LogIn,
  LogInChat
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)