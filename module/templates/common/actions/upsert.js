const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_UPSERT_REQUEST_START,
  <%= moduleName_upperCase%>_UPSERT_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_UPSERT_REQUEST_FAILURE,

} = require('../constants').default

//upsert
export function upsertRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_UPSERT_REQUEST_START
  }
}
export function upsertRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_UPSERT_REQUEST_SUCCESS,
    payload: json
  }
}

export function upsertRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_UPSERT_REQUEST_FAILURE,
    payload: error
  }
}