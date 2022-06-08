'use strict'

const dynamoDb = require('../config/dynamoDb')
const { sendResponse } = require('../utils/sendResponse')

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
