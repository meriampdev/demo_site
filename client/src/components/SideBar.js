import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class SideBar extends Component {
  render() {
    const { user } = this.props
    let img_url = user && user.user_data ? `https://graph.facebook.com/${user.user_data.id}/picture?type=large` : ''
    return(
       <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li>
            <div className="flex-items-sm-center">
              <div className="clearfix">
                <div className="card profile-card">
                  <figure>
                    <img
                      src={img_url}
                      className="img-fluid img-profile"
                      alt="Card"
                    />
                  </figure>
                  <div className="card-block text-xs-center">
                    <p className="h4 card-title font-weight-bold">{user && user.user_data ? user.user_data.name : ''}</p>
                    <p className="h6 card-subtitle text-muted">{user && user.user_data ? user.user_data.email : ''}</p><br />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="sidebar-brand">
            <a>Demo Site</a>
          </li>
          <li>
            <Link to='/portal/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/portal/places'>Google Places</Link>
          </li>
          <li>
            <Link to='/portal/chatty'>Chat App</Link>
          </li>
          <li>
            <Link to='/portal/about'>About</Link>
          </li>
          <li>
            <Link to='/portal/contact'>Contact</Link>
          </li>
      </ul>
    </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)
