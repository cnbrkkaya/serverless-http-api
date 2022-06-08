'use strict'

const dynamoDb = require('../config/dynamoDb')
const { sendResponse } = require('../utils/sendResponse')

module.exports.updateNote = async (event) => {
  //this control is for testing from both serverless dasboard and postman
  const body =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  try {
    //collecting update parameters
    const { noteMessage, noteId } = body
    // defining params object
    const params = {
      TableName: process.env.DYNAMODB_NOTE_TABLE,
      Key: {
        noteId,
      },
      ExpressionAttributeValues: {
        ':noteMessage': noteMessage,
      },
      //prevent creating if the note doesn't exist
      ConditionExpression: 'attribute_exists(noteId)',
      UpdateExpression: 'SET noteMessage = :noteMessage',
      ReturnValues: 'ALL_NEW',
    }
    //sending update request to dynamoDB
    const data = await dynamoDb.update(params).promise()

    if (data.Attributes) {
      return sendResponse(200, {
        message: 'Note Updated',
        item: data.Attributes,
      })
    } else {
      return sendResponse(404, { message: 'Cannot find Note' })
    }
  } catch (e) {
    return sendResponse(500, { message: 'Could not update Note' })
  }
}
