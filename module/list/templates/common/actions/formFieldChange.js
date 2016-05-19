const  _ = require('lodash')

const ApiFactory = require('../../../../services/api').default

const {

  <%= moduleName_upperCase%>_FORMFIELD_CHANGE

} = require('../constants').default


export function formFieldChange(field,value) {
  return {
    type: <%= moduleName_upperCase%>_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  }
}