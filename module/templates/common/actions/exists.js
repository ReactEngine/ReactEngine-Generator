const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_EXISTS_REQUEST_START,
  <%= moduleName_upperCase%>_EXISTS_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_EXISTS_REQUEST_FAILURE,

} = require('../constants').default

//exists
export function existsRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_EXISTS_REQUEST_START
  }
}

export function existsRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_EXISTS_REQUEST_SUCCESS,
    payload: json
  }
}

export function existsRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_EXISTS_REQUEST_FAILURE,
    payload: error
  }
}