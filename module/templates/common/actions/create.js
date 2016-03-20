const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default
import * as findActions from './find'
const {

  TODO_CREATE_REQUEST_START,
  TODO_CREATE_REQUEST_SUCCESS,
  TODO_CREATE_REQUEST_FAILURE,

} = require('../constants').default

//create
export function createRequestStart() {
  return {
    type: TODO_CREATE_REQUEST_START
  }
}

export function createRequestSuccess(json) {
  return {
    type: TODO_CREATE_REQUEST_SUCCESS,
    payload: json
  }
}

export function createRequestFailure(error) {
  return {
    type: TODO_CREATE_REQUEST_FAILURE,
    payload: error
  }
}


export function create(data) {
  return dispatch => {
    //请求开始
    dispatch(createRequestStart())
    return  ApiFactory().<%= moduleCommonName %>.create(data)
      .then((res) => {
          //请求成功
          dispatch(createRequestSuccess({res:res}))
          
          // //刷新列表数据
          // const filter ={}
          // const options={}
          // //请求开始
          // dispatch(findActions.findRequestStart())
          // ApiFactory().<%= moduleCommonName %>.find(filter)
          //   .then((data) => {
          //       // let rows = {}
          //       // const page = options.page || '1'
          //       // const header = 'Page_'+ page
          //       // rows[header] = data
          //       //请求成功
          //       dispatch(findActions.findRequestSuccess({
          //        data:_.sortBy(data,(item)=>{
          //           return item.updateAt
          //         }),
          //         options:options
          //       }))
          //   })
          //   .catch((error) => {
          //      dispatch(findActions.findRequestFailure(error))
          //   })
          
      })
      .catch((error) => {
         dispatch(createRequestFailure(error))
      })

  }
}