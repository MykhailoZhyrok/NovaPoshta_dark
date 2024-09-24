import React, {useState, useEffect} from 'react'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store/store';

import CreateOrderScreen from './Screens/CreateOrderScreen/CreateOrderScreen';
import MyOrdersScreen from './Screens/MyOrdersScreen/MyOrdersScreen';
import PointsScreen from './Screens/PointsScreen./PointsScreen';
import MapScreen from './Screens/PointsScreen./MapScreen/MapScreen';
import PointsListScreen from './Screens/PointsScreen./PointsListScreen/PointsListScreen';
import LoginPhoneScreen from './Screens/LoginScreen/LoginPhoneScreen';
import PinCodeInput from './Screens/LoginScreen/phonePin/PinCodeInput';
import UserScreen from './Screens/UserScreen/UserScreen';
import SettingsScreen from './Screens/UserScreen/child/SettingsScreen';
import * as Keychain from 'react-native-keychain';
import loginEventEmitter from './path/eventEmmit';
import PaymantsHistory from './Screens/UserScreen/child/PaymentsHistory';

const retriveUser = async () => {
  try {
      const credentials = await Keychain.getGenericPassword();
      console.log(credentials.username)
      return credentials
  }
  catch (err) {
    
      console.log(err);
  }
}

const LoginStack = createNativeStackNavigator();
const LoginStackNavigator = () => (
  <LoginStack.Navigator  screenOptions={{
    headerShown: false, 
    gestureEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS, 
  }}>
    <LoginStack.Screen name="LoginPhone" component={LoginPhoneScreen} />
    <LoginStack.Screen name="PinCodeInput" component={PinCodeInput} />
  </LoginStack.Navigator>
);

const AppStack = createNativeStackNavigator();
const AppStackNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="CreateOrder" component={CreateOrderScreen} />
    <AppStack.Screen name="MyOrders" component={MyOrdersScreen} />
    <AppStack.Screen name="Points" component={PointsScreen} />
    <AppStack.Screen name="Map" component={MapScreen} />
    <AppStack.Screen name="List" component={PointsListScreen} />
    <AppStack.Screen name="UserScreen" component={UserScreen} />
    <AppStack.Screen name="PaymantsHistory" component={PaymantsHistory} />
    <AppStack.Screen name="SettingsScreen" component={SettingsScreen} />


  </AppStack.Navigator>
);

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const credentials = await retriveUser();
      setIsLoggedIn(!!credentials?.username);
    };

    const handleLoginSuccess = () => {
      checkLoginStatus();  
    };
    const handleLogoutSuccess = () =>{
      setIsLoggedIn(false);
    }
    loginEventEmitter.on('loginSuccess', handleLoginSuccess);
    loginEventEmitter.on('logoutSuccess', handleLogoutSuccess);
    checkLoginStatus();

    return () => {
      loginEventEmitter.off('loginSuccess', handleLoginSuccess);
    };
  }, []);
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? <AppStackNavigator /> : <LoginStackNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
