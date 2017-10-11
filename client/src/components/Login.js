/*eslint-disable no-undef*/

import React, { Component } from 'react'

class Login extends Component {
  componentDidMount() {
    const self = this;


    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      if (typeof(FB) !== 'undefined' && FB != null) {
        FB.init({
          appId      : '346407729105738',
          cookie: true,
          xfbml      : true,
          version    : 'v2.10'
        })

        FB.getLoginStatus(function(response) {
          self.statusChangeCallback(response);
        })

        FB.Event.subscribe('auth.login', function(response) {
          self.testAPI()
        });

        FB.AppEvents.logPageView();        
      } else {
        console.log('NO FB')
      }
    }
  }

  statusChangeCallback(response) {
    // console.log('statusChangeCallback')
    // console.log(response)
    if (response.status === 'connected') {
      this.testAPI();

      // FB.api('/search?q=meriam&type=user', function(response) {
      //   console.log('facebook search', response)
      // })
    }
  }

  testAPI() {
    const { LogIn, history, LogInChat } = this.props
    FB.api('/me?fields=id,email,cover,name,first_name,last_name,age_range,link,gender,hometown', function(response) {
      LogIn(response)
      LogInChat(response)
      history.push('/portal')
    });
  }

  render() {
    return(
      <div className={'fade '+this.props.className}>
        <div
          className="fb-login-button"
          data-max-rows="1" data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
          data-scope = "public_profile,email,user_hometown"
        >
        </div>
        <hr />
        OR 
        <hr />
        <form id="login-form" action="https://phpoll.com/login/process" method="post">
          <div className="form-group">
            <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value="" />
          </div>
          <div className="form-group">
            <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
          </div>
          <div className="form-group text-center">
            <input type="checkbox" tabIndex="3" className="" name="remember" id="remember" />
            <label htmlFor="remember"> Remember Me</label> 
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <a href="https://phpoll.com/recover" tabIndex="5" className="forgot-password">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login