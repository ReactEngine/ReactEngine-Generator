'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const InitialState = require('../initialState').default
import formValidation from './formValidation'
const fieldValidation = require('../../../common/reducers/fieldValidation').default

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
  <%= moduleName_upperCase%>_FORMFIELD_CHANGE

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

  switch (action.type) {

    // case <%= moduleName_upperCase%>_DELETE_START:
    case <%= moduleName_upperCase%>_ITEM:
     let newState = state.setIn(['form','isFetching'], false)
        .setIn(['form','fields','id'], action.payload.fields.id)
        .setIn(['form','fields','text'], action.payload.fields.text)
        .setIn(['form','fields','completed'], action.payload.fields.completed)
        .setIn(['form','fields','createdAt'], action.payload.fields.createdAt)
        .setIn(['form','fields','updatedAt'], action.payload.fields.updatedAt)
        .setIn(['form','title'], action.payload.title)
        //console.log('<%= moduleName_upperCase%>_ITEM newState:',newState)
        return newState

    //create
    case <%= moduleName_upperCase%>_CREATE_REQUEST_START:
     return state.setIn(['form','error'], null)
       .setIn(['form','isFetching'], true)

    case <%= moduleName_upperCase%>_CREATE_REQUEST_SUCCESS:
        return state.setIn(['form','isFetching'], false)
         .setIn(['form','error'], null)
         .setIn(['form','fields','id'], action.payload.res.id)
         .setIn(['form','fields','text'], action.payload.res.text)
         .setIn(['form','fields','completed'], action.payload.res.completed)
         .setIn(['form','fields','createdAt'], action.payload.res.createdAt)
         .setIn(['form','fields','updatedAt'], action.payload.res.updatedAt)


    case <%= moduleName_upperCase%>_CREATE_REQUEST_FAILURE:
      return state.setIn(['form','isFetching'], false)
        .setIn(['form','error'], action.payload)

    //updateAttributes
    case <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_START:
     return state.setIn(['form','isFetching'], true)
       .setIn(['form','error'], null)

    case <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_SUCCESS:
      let item = action.payload.res
      return state.setIn(['form','isFetching'], false)
       .setIn(['form','error'], null)
       .setIn(['form','fields','id'], item.id)
       .setIn(['form','fields','text'], item.text)
       .setIn(['form','fields','completed'], item.completed)
       .setIn(['form','fields','createdAt'], item.createdAt)
       .setIn(['form','fields','updatedAt'], item.updatedAt)
      // return state.setIn(['form','isFetching'], false)
      //  .setIn(['form','error'], null)
      //  .setIn(['form','fields'], action.payload.item)

    case <%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_FAILURE:
      return state.setIn(['form','isFetching'], false)
        .setIn(['form','error'], action.payload)

    case <%= moduleName_upperCase%>_FORMFIELD_CHANGE: {
      const {field, value} = action.payload
      let nextState =  state.setIn(['form', 'fields', field], value)
            .setIn(['form','error'],null)
      return formValidation(
        fieldValidation(nextState, action)
        , action)
    }
  }
  /**
   * ## Default
   */
  return state
}