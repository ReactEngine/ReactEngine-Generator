const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_COUNT_REQUEST_START,
  <%= moduleName_upperCase%>_COUNT_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_COUNT_REQUEST_FAILURE,

} = require('../constants').default


//count
export function countRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_COUNT_REQUEST_START
  }
}

export function countRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_COUNT_REQUEST_SUCCESS,
    payload: json
  }
}

export function countRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_COUNT_REQUEST_FAILURE,
    payload: error
  }
}