const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_ITEM,
  <%= moduleName_upperCase%>_LIST

} = require('../constants').default

export function routerChangeStart(payload) {
  return {
    type: <%= moduleName_upperCase%>_ITEM,
    payload:payload
  }
}


export function routerChange(payload) {
  
  return dispatch => {
    //请求开始
    dispatch(routerChangeStart(payload))
}
}

export function routerChangeToListStart(payload) {
  return {
    type: <%= moduleName_upperCase%>_LIST,
    payload:payload
  }
}


export function routerChangeToList(payload) {
  
  return dispatch => {
    //请求开始
    dispatch(routerChangeToListStart(payload))
}
}