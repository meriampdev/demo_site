import { combineReducers } from 'redux'
import chat from './reducer/chat'
import user from './reducer/user'

export default combineReducers({
  chat,
  user
})