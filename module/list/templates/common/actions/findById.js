const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_FINDBYID_REQUEST_START,
  <%= moduleName_upperCase%>_FINDBYID_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_FINDBYID_REQUEST_FAILURE,

} = require('../constants').default


//findById
export function findByIdRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_FINDBYID_REQUEST_START
  }
}

export function findByIdRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_FINDBYID_REQUEST_SUCCESS,
    payload: json
  }
}

export function findByIdRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_FINDBYID_REQUEST_FAILURE,
    payload: error
  }
}