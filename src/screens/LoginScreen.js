import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const screenWidth = Math.round(Dimensions.get('window').width);

class LoginScreen extends React.Component {
    render() {        
      return (
        <KeyboardAwareView animated={true} doNotForceDismissKeyboardWhenLayoutChanges={false}>
          <ScrollView
              ref={(view) => {this.scrollView = view; }}                  
              keyboardShouldPersistTaps='always'
              automaticallyAdjustContentInsets={false}                  
              scrollEventThrottle={200}                  
              contentContainerStyle={{
                flex: 1,                    
                justifyContent: 'space-between'
            }}
              >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <CardView
                    cardElevation={3}
                    cardMaxElevation={2}
                    cornerRadius={5} style={{flex: 0.4}}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.4}}>
                            
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize:30, fontWeight:'bold'}}>
                                    Login
                                </Text>
                            </View>
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.7}}>
                            <Input
                                placeholder='PHONE'
                                leftIcon={
                                    <Icon
                                    name='phone'
                                    size={24}
                                    color='black'
                                    />
                                }
                                />
                            </View>
                            <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                                
                                <TouchableOpacity style={{ height: 30,width:screenWidth/2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center',borderRadius:5 }}
                                    onPress={() => {                       
                                      // this.props.navigation.navigate('Details');
                                      this.props.increase(15);
                                  }}  
                                  >
                                    <Text style={{color:'white'}}>NEXT</Text>
                                </TouchableOpacity>
                            </View>              
                        </View>
                </CardView> 
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:15, margin:10}}>Create new account?</Text>
                    <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('SignUp');}}
                    >
                        <Text style={{fontSize:15, margin:10, color:'red'}}>Sign Up</Text> 
                    </TouchableOpacity>     
                </View>     
            </View>
          </ScrollView>
        </KeyboardAwareView>
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

  export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);