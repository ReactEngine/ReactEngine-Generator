import * as constantUtils from '../../../../utils/constants'

const prefix = "RE$MODULE$"

export default constantUtils.addPrefix([

  //create
  "<%= moduleName_upperCase%>_CREATE_REQUEST_START",
  "<%= moduleName_upperCase%>_CREATE_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_CREATE_REQUEST_FAILURE",

  //find
  "<%= moduleName_upperCase%>_FIND_REQUEST_START",
  "<%= moduleName_upperCase%>_FIND_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_FIND_REQUEST_FAILURE",

  //findById
  "<%= moduleName_upperCase%>_FINDBYID_REQUEST_START",
  "<%= moduleName_upperCase%>_FINDBYID_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_FINDBYID_REQUEST_FAILURE",

  //findOne
  "<%= moduleName_upperCase%>_FINDONE_REQUEST_START",
  "<%= moduleName_upperCase%>_FINDONE_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_FINDONE_REQUEST_FAILURE",

  //exists
  "<%= moduleName_upperCase%>_EXISTS_REQUEST_START",
  "<%= moduleName_upperCase%>_EXISTS_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_EXISTS_REQUEST_FAILURE",

  //count
  "<%= moduleName_upperCase%>_COUNT_REQUEST_START",
  "<%= moduleName_upperCase%>_COUNT_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_COUNT_REQUEST_FAILURE",

  //update
  "<%= moduleName_upperCase%>_UPDATE_REQUEST_START",
  "<%= moduleName_upperCase%>_UPDATE_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_UPDATE_REQUEST_FAILURE",

  //upsert
  "<%= moduleName_upperCase%>_UPSERT_REQUEST_START",
  "<%= moduleName_upperCase%>_UPSERT_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_UPSERT_REQUEST_FAILURE",

  //updateAttributes
  "<%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_START",
  "<%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_UPDATEATTRIBUTES_REQUEST_FAILURE",

  //delete
  "<%= moduleName_upperCase%>_DELETE_REQUEST_START",
  "<%= moduleName_upperCase%>_DELETE_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_DELETE_REQUEST_FAILURE",

  //getChangeStream
  "<%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_START",
  "<%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_GETCHANGESTREAM_REQUEST_FAILURE",

  //createChangeStream
  "<%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_START",
  "<%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_SUCCESS",
  "<%= moduleName_upperCase%>_CREATECHANGESTREAM_REQUEST_FAILURE",

  "<%= moduleName_upperCase%>_LIST",
  "<%= moduleName_upperCase%>_LIST_INIT_START",

  "<%= moduleName_upperCase%>_ITEM",
  "<%= moduleName_upperCase%>_ITEM_INIT_START",
  "<%= moduleName_upperCase%>_FORMFIELD_CHANGE",

],prefix)
