import {
  LOG_IN,
  SEARCH
} from '../types/user'

let INITIAL_STATE = {
  user_data: null,
  search_results: []
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOG_IN:
      return { ...state, user_data: action.data }
    case SEARCH:
      return { ...state, search_results: action.data }
    default:
      return state;
  }
}