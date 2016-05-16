const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  <%= moduleName_upperCase%>_FINDONE_REQUEST_START,
  <%= moduleName_upperCase%>_FINDONE_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_FINDONE_REQUEST_FAILURE,

} = require('../constants').default


//findOne
export function findOneRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_FINDONE_REQUEST_START
  }
}

export function findOneRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_FINDONE_REQUEST_SUCCESS,
    payload: json
  }
}

export function findOneRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_FINDONE_REQUEST_FAILURE,
    payload: error
  }
}