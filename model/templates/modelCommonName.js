require('regenerator/runtime')
import * as utils from '../utils'
import Model from '../model'

export default class extends Model {
  constructor(config = {}) {
    super()
    this.modelName = "<%= modelName %>"
    this.modelNamePlural = this.modelName + "s"
    this.urlBase = config.urlBase
  }
}