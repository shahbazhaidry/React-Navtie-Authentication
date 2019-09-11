import React, {Fragment} from 'react';
import { Button, View, Text } from 'react-native';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class DetailsScreen extends React.Component {

    render() {      
      const { navigation } = this.props;
      const itemId = navigation.getParam('itemId', 'NO-ID');
      const otherParam = navigation.getParam('otherParam', 'some default value');
      
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <Button
          title="Increment"
          onPress={() => {                       
            // this.props.navigation.navigate('Details');
            this.props.increase(1);
        }}  
        />
        <Button
          title="Decrement"
          onPress={() => this.props.dispatch({ type: 'DECREMENT' })}
        />

        <Text>{JSON.stringify(this.props.count)}</Text>
        
        </View>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      count: state.count    
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      increase: Actions.increase,
      decrease: Actions.decrease,
    }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);