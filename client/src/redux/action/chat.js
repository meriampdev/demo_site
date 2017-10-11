export const SendMessage = (message) => {
  return {
    type: 'server/hello',
    data: message
  }
}