const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_START,
  <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_FAILURE,

} = require('../constants').default

//getChangeStream
export function getChangeStreamRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_START
  }
}
export function getChangeStreamRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_SUCCESS,
    payload: json
  }
}

export function getChangeStreamRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_FAILURE,
    payload: error
  }
}