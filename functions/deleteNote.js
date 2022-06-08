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

module.exports.deleteNote = async (event) => {
  try {
    //Note id from path parameters
    const { id } = event.pathParameters
    // Delete params object
    const params = {
      TableName: process.env.DYNAMODB_NOTE_TABLE,
      Key: {
        noteId: id,
      },
    }
    // dynamodb delete request
    await dynamoDb.delete(params).promise()
    // success response
    return sendResponse(200, {
      message: 'Note deleted successfully',
      deletedItemID: id,
    })
  } catch (e) {
    console.log(e)
    // error response
    return sendResponse(500, { message: 'Could not delete the Note' })
  }
}
