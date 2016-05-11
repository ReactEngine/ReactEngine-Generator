/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('../initialState').default

const {
  //create
  <%= moduleName_upperCase%>_CREATE_REQUEST_START,
  <%= moduleName_upperCase%>_CREATE_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_CREATE_REQUEST_FAILURE,

  //find
  <%= moduleName_upperCase%>_FIND_REQUEST_START,
  <%= moduleName_upperCase%>_FIND_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_FIND_REQUEST_FAILURE,

  //findById
  <%= moduleName_upperCase%>_FINDBYID_REQUEST_START,
  <%= moduleName_upperCase%>_FINDBYID_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_FINDBYID_REQUEST_FAILURE,

  //findOne
  <%= moduleName_upperCase%>_FINDONE_REQUEST_START,
  <%= moduleName_upperCase%>_FINDONE_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_FINDONE_REQUEST_FAILURE,

  //exists
  <%= moduleName_upperCase%>_EXISTS_REQUEST_START,
  <%= moduleName_upperCase%>_EXISTS_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_EXISTS_REQUEST_FAILURE,

  //count
  <%= moduleName_upperCase%>_COUNT_REQUEST_START,
  <%= moduleName_upperCase%>_COUNT_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_COUNT_REQUEST_FAILURE,

  //update
  <%= moduleName_upperCase%>_UPDATE_REQUEST_START,
  <%= moduleName_upperCase%>_UPDATE_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_UPDATE_REQUEST_FAILURE,

  //upsert
  <%= moduleName_upperCase%>_UPSERT_REQUEST_START,
  <%= moduleName_upperCase%>_UPSERT_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_UPSERT_REQUEST_FAILURE,

  //updateAttributes
  <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_START,
  <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_FAILURE,

  //delete
  <%= moduleName_upperCase%>_DELETE_REQUEST_START,
  <%= moduleName_upperCase%>_DELETE_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_DELETE_REQUEST_FAILURE,

  //getChangeStream
  <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_START,
  <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_FAILURE,

  //createChangeStream
  <%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_START,
  <%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_SUCCESS,
  <%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_FAILURE,

  <%= moduleName_upperCase%>_LIST,
  <%= moduleName_upperCase%>_LIST_INIT_START,

  <%= moduleName_upperCase%>_ITEM,
  <%= moduleName_upperCase%>_ITEM_INIT_START,
  <%= moduleName_upperCase%>_FORMFIELD_CHANGE,

} = require('../../common/constants').default

const initialState = new InitialState

/**
 * ## reducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return initialState.mergeDeep(state)
  }
  const data = state.get('data')

  switch (action.type) {

    // create
    case <%= moduleName_upperCase%>_CREATE_REQUEST_START:
     return state.setIn(['error'], null)
       .setIn(['isFetching'], true)

    case <%= moduleName_upperCase%>_CREATE_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], null)
        .setIn(['data'], [...data, action.payload.res])

    case <%= moduleName_upperCase%>_CREATE_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    //find
    case <%= moduleName_upperCase%>_FIND_REQUEST_START:
     return state.setIn(['isFetching'], true)
          .setIn(['error'], null)
       

    case <%= moduleName_upperCase%>_FIND_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], null)
        .setIn(['data'], action.payload.data)
        .setIn(['options'], action.payload.options)
        .setIn(['shouldRefresh'], false)

    case <%= moduleName_upperCase%>_FIND_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)
        .setIn(['shouldRefresh'], false)

    //updateAttributes
    case <%= moduleName_upperCase%>_UPDATE_REQUEST_START:
    case <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_START:
     return state.setIn(['isFetching'], true)
       .setIn(['error'], null)

    // case <%= moduleName_upperCase%>_UPDATE_REQUEST_SUCCESS: //<%= moduleName %>
    case <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_SUCCESS:
      let index = _.findIndex(state.get('data'), function(item) { 
        return item.id == action.payload.res.id 
      })
      return state.setIn(['isFetching'], false)
          .setIn(['data'],[...data.slice(0, index),
            action.payload.res,
            ...data.slice(index + 1)]
      )

    case <%= moduleName_upperCase%>_UPDATE_REQUEST_FAILURE:
    case <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    //delete
    case <%= moduleName_upperCase%>_DELETE_REQUEST_START:
     return state.setIn(['error'], null)
       .setIn(['isFetching'], true)

    case <%= moduleName_upperCase%>_DELETE_REQUEST_SUCCESS:
      return state.setIn(['isFetching'], false)
          .setIn(['data'], _.filter(state.get('data'),(item)=>{
            return item.id != action.payload.id
          }))

    case <%= moduleName_upperCase%>_DELETE_REQUEST_FAILURE:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], action.payload)

    case <%= moduleName_upperCase%>_LIST:
      return state.setIn(['isFetching'], false)
        .setIn(['error'], null)
        .setIn(['shouldRefresh'], true)

  }
  /**
   * ## Default
   */
  return state
}