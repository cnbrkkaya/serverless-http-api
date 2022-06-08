'use strict'

const dynamoDb = require('../config/dynamoDb')
const { v4: uuidv4 } = require('uuid')
const { sendResponse } = require('../utils/sendResponse')

module.exports.createNote = async (event) => {
  //this control is for testing from both serverless dasboard and postman
  const body =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body

  try {
    //collecting parameters
    const { noteMessage } = body
    const noteId = uuidv4()
    const TableName = process.env.DYNAMODB_NOTE_TABLE
    // defining params object
    const params = {
      TableName,
      Item: {
        noteId,
        noteMessage,
      },
    }
    //sending put request to dynamoDB
    await dynamoDb.put(params).promise()
    //success response
    return sendResponse(200, {
      message: 'Note successfully created',
      item: params.Item,
    })
  } catch (error) {
    console.log(error)
    //error response
    return sendResponse(500, { message: 'Could not create the note' })
  }
}
