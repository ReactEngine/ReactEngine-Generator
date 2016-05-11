const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  <%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_START,
  <%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_FAILURE,

} = require('../constants').default

//createChangeStream
export function createChangeStreamRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_START
  }
}
export function createChangeStreamRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_SUCCESS,
    payload: json
  }
}

export function createChangeStreamRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_FAILURE,
    payload: error
  }
}