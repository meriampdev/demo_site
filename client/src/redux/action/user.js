import {
  LOG_IN,
  SEARCH
} from '../types/user'
import axios from 'axios'

export const LogIn = (data) => {
  return {
    type: LOG_IN,
    data: data
  }
}

export const Search = (keyword, location) => {
  const request = axios({
    method:'get',
    url: `/api/search?location=${location}&keyword=${keyword}`
  })

  return dispatch => {
    // if(keyword) {
      request.then(res => {
        dispatch({
          type: SEARCH,
          data: res.data.results
        })
      })
    // }
    // else {
    //   dispatch({
    //     type: SEARCH,
    //     payload: []
    //   })
    // }
  }
}