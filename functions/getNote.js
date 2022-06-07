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

module.exports.getNote = async (event) => {
  try {
    const { id } = event.pathParameters
    //params object
    const params = {
      TableName: process.env.DYNAMODB_NOTE_TABLE,
      KeyConditionExpression: 'noteId = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
      Select: 'ALL_ATTRIBUTES',
    }

    //sending get request to dynamoDB
    const data = await dynamoDb.query(params).promise()
    //data length control
    if (data.Count > 0) {
      return sendResponse(200, { item: data.Items })
    } else {
      return sendResponse(404, { message: 'Note not found' })
    }
  } catch (e) {
    console.log(e)
    return sendResponse(500, { message: 'Could not get the Note' })
  }
}
