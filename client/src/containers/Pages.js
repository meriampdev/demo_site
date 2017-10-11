import React, { Component } from 'react'
import SideBar from '../components/SideBar'
// import PageContent from '../components/PageContent'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
    const { user, children } = this.props
    console.log('props', this.props)
    return(
      <div id="wrapper" className={classnames({ toggled })}>
        <SideBar
          UserData = {user.user_data}
        />
        { children }
        {
        // <PageContent toggleMenu={this.toggleMenu.bind(this)} />
        }
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
)(Pages)