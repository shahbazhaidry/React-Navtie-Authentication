import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DetailsScreen from './screens/DetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';

const MainStack = createDrawerNavigator(
    {    
        Details: {
        screen: DetailsScreen,
        },
    },
    {
        initialRouteName: 'Details'
    }
);

const drawerScreens = createStackNavigator({
    Main  : MainStack,
    Splash: SplashScreen,
    Login: {
        screen: LoginScreen,
        navigationOptions: { header: null }
    },
    SignUp: {
        screen: SignupScreen,
        navigationOptions: { header: null }
    },

}, {
    initialRouteName: 'Splash'
}) 

class Root extends React.Component {
    render() {
        const Navigation = createAppContainer(drawerScreens);
        return (<Navigation/>);
    }
}

export default Root;