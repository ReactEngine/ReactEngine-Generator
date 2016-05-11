'use strict'
import React,
{
  StyleSheet,
  View,
  Text,
  Component
}
from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions as routerActions }  from 'react-native-router-flux'
import DetailForm from '../components/form'
import ErrorAlert from '../../../common/components/ErrorAlert'
import FormButton from '../../../common/components/FormButton'
import NavigationBar from 'react-native-navbar'
import moduleActions from '../../common/actions'
import * as actionUtils from '../../../../utils/action'

function mapStateToProps(state) {
  return {
      ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionUtils.getCreators(moduleActions), dispatch),
    dispatch
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
})

class DetailContainer extends Component {
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
  }
  // componentWillReceiveProps(nextprops) {
  //   console.log(">>>>>>>>>> DetailContainer componentWillReceiveProps nextprops:",nextprops)
  //   // const currentViewNextProps = nextprops.<%= moduleName_lowerCase %>Detail
  //   // this.setState({
  //   //   value: {
  //   //     id: currentViewNextProps.form.fields.id,
  //   //     text: currentViewNextProps.form.fields.text,
  //   //     completed: currentViewNextProps.form.fields.completed,
  //   //   }
  //   // })
  // }
  getMode(){
    const itemId = this.props.<%= moduleName_lowerCase %>Detail.form.fields.id
    return itemId?'update':'add'
  }
  onButtonPress(){
    // this.props.actions.updateAttributes(this.props.<%= moduleName_lowerCase %>Detail.form.fields.id,this.state.value)
    const data = {
          text: this.props.<%= moduleName_lowerCase %>Detail.form.fields.text || "",
          completed: this.props.<%= moduleName_lowerCase %>Detail.form.fields.completed || false
      }
    if(this.getMode()=='update'){
      this.props.actions.updateAttributes(this.props.<%= moduleName_lowerCase %>Detail.form.fields.id,data)
    }else{
      this.props.actions.create(data)
    }
  }
  formFieldChange(value,fields){
    _.each(fields,(field)=>{
      this.props.actions.formFieldChange(field,value[field])
    })
  }
  NavigateBack(){
    //路由切换
    routerActions.pop()
    //更改 list state  
    this.props.actions.routerChangeToList()
  }
  render() {
    let self = this
    const buttonText = this.getMode()=='update'?'Update':'Add'

    console.log(">>>>>>>>>> DetailContainer render,currentViewProps:",self.props.<%= moduleName_lowerCase %>Detail)
    self.errorAlert.checkError(self.props.<%= moduleName_lowerCase %>Detail.form.error)

    return (
      <View style={styles.container}>
        <NavigationBar
                  title={{
                    title: self.props.title || "Detail View"
                  }}
                  leftButton={{
                    title: 'Back',
                    handler: self.NavigateBack.bind(self)
                  }}
        />
        <View style={styles.inputs}>
          <DetailForm
              onChange={self.formFieldChange.bind(self)}
              form={self.props.<%= moduleName_lowerCase %>Detail.form}
          />
        </View>
        <FormButton
            isDisabled={!self.props.<%= moduleName_lowerCase %>Detail.form.isValid || self.props.<%= moduleName_lowerCase %>Detail.form.isFetching}
            onPress={self.onButtonPress.bind(self)}
            buttonText={buttonText}/>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)
