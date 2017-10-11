/*eslint-disable no-undef*/

import React, { Component } from 'react';
import UserList from '../components//UserList'
import ChatRoom from '../components/ChatRoom'
import '../css/chat.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  SendMessage,
  CreateRoom,
  Seen,
  SendPM
} from '../redux/action/chat'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      username: '',
      type: 'common',
      header: 'Common Room'
    }
  }  

  onSend(userdata, text, type) {
    const { SendMessage, SendPM } = this.props
    if (type === 'pm') {
      const { pm_userdata } = this.state
      let user_data = {
        id: pm_userdata.id,
        room: pm_userdata.room,
        name: userdata.name,
        photo: `https://graph.facebook.com/${userdata.id}/picture?type=square`
      }
      SendPM(user_data, text)
    } else {
      SendMessage(userdata, text)
    }
  }

  onClickUser(userdata) {
    const { chatty, CreateRoom, Seen } = this.props

    if (!userdata.room) {
      const room = chatty.log_in_data.id + userdata.id 
      userdata.room = room
      CreateRoom({
        room,
        to: userdata.socket_id,
        from: chatty.log_in_data.socket_id
      })
    }

    if (userdata.newMessage) {
      Seen(userdata)
    }

    this.setState({
      type: 'pm',
      pm_userdata: userdata,
      header: `${chatty.log_in_data.name} + ${userdata.name}`
    })
  }

  back() {
    this.setState({ type: 'common', header: 'Common Room' })
  }

  render() {
    const { header, type, pm_userdata } = this.state
    const { chatty, user } = this.props
    let chat = []
    if (type === 'common') {
      chat = chatty.messages
    } else {
      chat = chatty.privateRoom[pm_userdata.room] ? 
        chatty.privateRoom[pm_userdata.room].messages : []
    }

    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
        {
          user.user_data ? 
            <ChatRoom
              header={header}
              type={type}
              chat={chat}
              UserData={user.user_data}
              pm_userdata={pm_userdata}
              onSend = {this.onSend.bind(this)}
              back = {this.back.bind(this)}
            />
          : null
        }
        {
          type === 'common' ? 
            <UserList
              users={chatty.online_users}
              onClickUser={this.onClickUser.bind(this)}
            />
          : null
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatty: state.chat,
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  SendMessage,
  SendPM, CreateRoom,
  Seen
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
