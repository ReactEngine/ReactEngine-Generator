'use strict'
import React,
{   
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform
}
from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const ApiFactory = require('../../../../services/api').default
import moduleActions from '../../common/actions'
import NavigationBar from 'react-native-navbar'
import * as actionUtils from '../../../../utils/action'
import { Actions as routerActions }  from 'react-native-router-flux'
import styles from '../components/List.styles'
import RowComponent from '../components/Row'
import GiftedListView from '../../../common/components/GiftedListView'

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

class ListContainer extends Component {
  componentWillReceiveProps(nextprops) {
    console.log(">>>>>>>>>> DetailContainer componentWillReceiveProps nextprops:",nextprops)
    // const currentViewNextProps = nextprops.<%= moduleCommonName %>Detail
    this.setState({
      shouldRefresh:nextprops.<%= moduleCommonName %>List.shouldRefresh,
      data: nextprops.<%= moduleCommonName %>List.data,
      options:nextprops.<%= moduleCommonName %>List.options
    })
  }
  _renderRowView(item) {
     return (
       <RowComponent 
       item={item}
       key={item.id}
       actions={this.props.actions}
       />
     )
   }
    _renderSeparatorView() {
      return (
        <View 
        style={styles.separator} 
        />
      )
    }

   onFetch(page = 1, options) {
     console.log("container/_onFetch page:",page," options:",options)
     const pageLength = 10 //每一个 page 有多少 item
     const skip = pageLength * (page-1)
     const filter = {
       skip:skip,
       limit:10,
       order:'updatedAt DESC'
     }
     options = _.assign({},options,{
       page:page
     })

     let find 
     if(this.actions){
      find = this.actions.find
     }
     else{
      find = this.props.actions.find
     }
     find(filter,options)
   }

  render() {
    // if(this.props.<%= moduleCommonName %>List.shouldRefresh){
    //   this.onFetch()
    // }
    console.log("======== list container render,state:",this.state," props:",this.props)
    var titleConfig = {
      title: "<%= moduleName %>s"
    }
   var rightButtonConfig = {
      title: 'Add',
      handler: ()=>{
        routerActions.<%= moduleCommonName %>Detail()
        //改 detail 的 state
        this.props.actions.routerChange({
          fields:{}, title:"Add <%= moduleName %>"
        })
      }
    }
    return(
      <View style={styles.container}>
        <NavigationBar
          title={ titleConfig }
          rightButton={ rightButtonConfig }
        />
        <GiftedListView
          rowView={this._renderRowView.bind(this)}
          onFetch={this.onFetch}

          actions={this.props.actions}

          fetchedData={this.props.<%= moduleCommonName %>List.data}
          fetchOptions={this.props.<%= moduleCommonName %>List.options}
          
          initialListSize={12}
          firstLoader={true}
        
          pagination={false}

          refreshable={true} 
          refreshableViewHeight={50} 
          refreshableDistance={40} 
          
          renderSeparator={this._renderSeparatorView}
          
          withSections={false}
          
          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}
        />        
       </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

