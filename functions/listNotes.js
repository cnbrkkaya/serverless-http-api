'use strict'

const dynamoDb = require('../config/dynamoDb')

//Creating response object
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

module.exports.listNotes = async (event) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_NOTE_TABLE,
    }
    //scanning dynamoDB Note table
    const notes = await dynamoDb.scan(params).promise()
    //success response
    return sendResponse(200, { items: notes.Items })
  } catch (e) {
    //error response
    return sendResponse(500, { message: 'Could not get the notes' })
  }
}
