const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_UPDATE_REQUEST_START,
  <%= moduleName_upperCase%>_UPDATE_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_UPDATE_REQUEST_FAILURE,

} = require('../constants').default


//update
export function updateRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_UPDATE_REQUEST_START
  }
}
export function updateRequestSuccess(data) {
  return {
    type: <%= moduleName_upperCase%>_UPDATE_REQUEST_SUCCESS,
    payload: data
  }
}

export function updateRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_UPDATE_REQUEST_FAILURE,
    payload: error
  }
}

export function update(where,data) {
  return dispatch => {
    //请求开始
    dispatch(updateRequestStart())
    return  ApiFactory().<%= moduleName_lowerCase %>.update(where,data)
      .then((res) => {
          //请求成功
          dispatch(updateRequestSuccess({
            res:res,
            data:data
          }))
      })
      .catch((error) => {
         dispatch(updateRequestFailure(error))
      })

  }
}