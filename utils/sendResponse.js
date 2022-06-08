//Creating response object for lambda functions
function sendResponse(statusCode, body) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }
  return response
}

module.exports = {
  sendResponse,
}
