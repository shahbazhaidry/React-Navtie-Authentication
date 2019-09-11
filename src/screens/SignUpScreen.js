import React from 'react';
import { Button, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from "firebase";
import Biometrics from 'react-native-biometrics';
const screenWidth = Math.round(Dimensions.get('window').width);

var firebaseConfig = {
    apiKey: "AIzaSyBL9_zQdXvrkOXzGUz7Y3_GL_iqC34HI-c",
    authDomain: "reactnativecarapp.firebaseapp.com",
    databaseURL: "https://reactnativecarapp.firebaseio.com",
    projectId: "reactnativecarapp",
    storageBucket: "",
    messagingSenderId: "142140113441",
    appId: "1:142140113441:web:654b3620e87dc12f951960"
  };
  
firebase.initializeApp(firebaseConfig);

class SignupScreen extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {     
            email: '',
            password:'123456',
            phone: ''
        }
      }
    componentDidMount(){
        Biometrics.isSensorAvailable()
        .then((biometryType) => {
            // if (biometryType === Biometrics.TouchID) {
            //     console.log('TouchID is supported')
            // } else 
            if (biometryType === Biometrics.FaceID) {
            console.log('FaceID is supported')
            } else {
            console.log('Biometrics not supported')
            }
        })
    }
    SignUp = async (email, pass, phone)=>{

        try {
            alert(this.props.fingerdata)
            console.log(phone)
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);    
            console.log("Account created");              
            
            firebase.auth().signInWithPhoneNumber(phone,response)
                .then(confirmResult => console.log(confirmResult))
                .catch(error => console.log(error)); 
         
            // Navigate to the Home page, the user is auto logged in
    
        } catch (error) {
            console.log(error.toString())
        }
    
    }
    handleEmailInput = (data) => {

        console.log('eeeee', data);

        this.setState({ email: data });

    }
    handlePhoneInput = (data) => {

        this.setState({ phone: data });

    }
    fingerprintHandler = () =>{
        Biometrics.createKeys('Confirm fingerprint')
        .then((publicKey) => {
            console.log(publicKey)
            this.props.setFingerdata(publicKey);
            alert(this.props.fingerdata);
            // sendPublicKeyToServer(publicKey)
        })
    }
    faceHandler = () =>{
        let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
        let payload = epochTimeSeconds + 'some message'
        Biometrics.simplePrompt('Confirm fingerprint')
  .then(() => {
    console.log('successful fingerprint provided')
  })
  .catch(() => {
    console.log('fingerprint failed or prompt was cancelled')
  })
    }
    render() {  
        const { email, phone, password } = this.state      
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CardView
                cardElevation={3}
                cardMaxElevation={2}
                cornerRadius={5} style={{flex: 0.7}}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.4}}>                        
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize:30, fontWeight:'bold'}}>
                                Sign up
                            </Text>
                        </View>
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center', width:screenWidth/1.7}}>
                        <Input
                            placeholder='Email'
                            leftIcon={
                                <Icon
                                name='mail'
                                size={24}
                                color='black'
                                />
                            }
                            value = {email}
                            onChangeText={(data) => { this.handleEmailInput(data) }}
                            />    
                        <Input
                            placeholder='Phone'
                            leftIcon={
                                <Icon
                                name='phone'
                                size={24}
                                color='black'
                                />
                            }
                            value={phone}
                            onChangeText={(data) => { this.handlePhoneInput(data) }}
                            />
                        </View>
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>                            
                            <TouchableOpacity style={{ height: 30,width:screenWidth/2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={() => {                       
                                    // this.props.navigation.navigate('Details');
                                    // this.props.increase(15);
                                    this.fingerprintHandler();
                                }}  
                                >
                                <Text style={{color:'white'}}>Fingerprint Set</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>                            
                            <TouchableOpacity style={{ height: 30,width:screenWidth/2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={() => {                       
                                    // this.props.navigation.navigate('Details');
                                    // this.props.increase(15);
                                    this.faceHandler();
                                }}  
                                >
                                <Text style={{color:'white'}}>Face Set</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:3, alignItems: 'center', justifyContent: 'center'}}>                            
                            <TouchableOpacity style={{ height: 30,width:screenWidth/2, marginTop: 10, backgroundColor:'black',alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={() => {                       
                                    // this.props.navigation.navigate('Details');
                                    // this.props.increase(15);
                                    this.SignUp(email, password, phone);
                                }}  
                                >
                                <Text style={{color:'white'}}>NEXT</Text>
                            </TouchableOpacity>
                        </View>              
                    </View>
            </CardView> 
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:15, margin:10}}>Already have an account?</Text>
                <TouchableOpacity
                onPress={() => {this.props.navigation.goBack();}}
                >
                    <Text style={{fontSize:15, margin:10, color:'red'}}>Sign In</Text> 
                </TouchableOpacity>     
            </View>     
        </View>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      fingerdata: state.fingerdata    
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setFingerdata: Actions.setFingerdata,
      decrease: Actions.decrease,
    }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);