import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Settings from '../screens/settings';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
const RootNavigator = () => {
  // const Tab = createBottomTabNavigator();
  // return (
  //   <Tab.Navigator
  //     initialRouteName="Home"
  //     screenOptions={{tabBarActiveTintColor: '#4682b4',headerShown:false}}>
  //     <Tab.Screen
  //       name="Home"
  //       component={Home}
  //       options={{
  //         tabBarLabel: 'Home',
  //         tabBarIcon: ({color, size}) => (
  //           <MaterialCommunityIcons name="home" color={color} size={size} />
  //         ),
  //       }}
  //     />
  //     <Tab.Screen
  //       name="Settings"
  //       component={Settings}
  //       options={{
  //         tabBarLabel: 'Settings',
  //         tabBarIcon: ({color, size}) => (
  //           <FontAwesome name="gear" color={color} size={size} />
  //         ),
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} options={{gestureEnabled: false}}/>
      <Stack.Screen name="Settings" component={Settings} options={{gestureEnabled: false}}/>
    </Stack.Navigator>
  )
};

export default RootNavigator;
