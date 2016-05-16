const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {
  <%= moduleName_upperCase%>_FIND_REQUEST_START,
  <%= moduleName_upperCase%>_FIND_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_FIND_REQUEST_FAILURE,

} = require('../constants').default

//find
export function findRequestStart() {
  return {
    type: <%= moduleName_upperCase%>_FIND_REQUEST_START
  }
}

export function findRequestSuccess(json,options) {
  return {
    type: <%= moduleName_upperCase%>_FIND_REQUEST_SUCCESS,
    payload: json,
    options:options
  }
}

export function findRequestFailure(error) {
  return {
    type: <%= moduleName_upperCase%>_FIND_REQUEST_FAILURE,
    payload: error
  }
}

export function find(filter={},options={}) {
  return dispatch => {
    //请求开始
    dispatch(findRequestStart())
    return  ApiFactory().todo.find(filter)
      .then((data) => {
          // let rows = {}
          // const page = options.page || '1'
          // const header = 'Page_'+ page
          // rows[header] = data
          //请求成功
          dispatch(findRequestSuccess({
            data:_.sortBy(data,(item)=>{
              return item.updateAt
            }),
            options:options
          }))
      })
      .catch((error) => {
         dispatch(findRequestFailure(error))
      })

  }
}

