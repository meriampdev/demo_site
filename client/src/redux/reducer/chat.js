export default (state = {}, action) => {
  switch(action.type){
    case 'message':
      return Object.assign({}, {message:action.data, type: action.type});
    default:
      return state;
  }
}