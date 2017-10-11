import React, { Component } from 'react'

class Register extends Component {
  render() {
    return(
      <form id="register-form" action="https://phpoll.com/register/process" method="post"
        className={'fade '+this.props.className}
      >
        <div className="form-group">
          <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value="" />
        </div>
        <div className="form-group">
          <input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" value="" />
        </div>
        <div className="form-group">
          <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now" />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Register