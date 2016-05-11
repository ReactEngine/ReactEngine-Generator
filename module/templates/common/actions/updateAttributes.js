const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_START,
  <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_FAILURE,

} = require('../constants').default

//updateAttributes
export function updateAttributesRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_START
  }
}
export function updateAttributesRequestSuccess(json) {
  return {
    type: <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_SUCCESS,
    payload: json
  }
}

export function updateAttributesRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_FAILURE,
    payload: error
  }
}

export function updateAttributes(id,data) {
  return dispatch => {
    //请求开始
    dispatch(updateAttributesRequestStart())
    return  ApiFactory().<%= moduleName_lowerCase %>.updateAttributes(id,data)
      .then((res) => {
          //请求成功
          dispatch(updateAttributesRequestSuccess({res:res}))
      })
      .catch((error) => {
         dispatch(updateAttributesRequestFailure(error))
      })

  }
}