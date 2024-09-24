import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react';
import NavbarScreen from '../../utils/NavbarScreen/NavbarScreen';
import MapScreen from './MapScreen/MapScreen'
import PointsListScreen from './PointsListScreen/PointsListScreen';
import { useRoute } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const { width } = Dimensions.get('window');


const PointsScreen = () => {
  
  const route = useRoute();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavbarScreen {...route}></NavbarScreen>
  
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: 'white' },
            tabBarIndicatorStyle: {
              backgroundColor: 'red',
              height: 2, 
            },
          }}
          
        >
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{tabBarLabel: 'Карта'}}
          />
          <Tab.Screen
            name="List"
            component={PointsListScreen}
            options={{tabBarLabel: 'Список'}}
          />
        </Tab.Navigator>

      </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default PointsScreen

const styles = StyleSheet.create({
  buttonCont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonHandle: {
    width: '50%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white'
  },
  underline: {
    height: 2,
    width: '50%',
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
  },


})