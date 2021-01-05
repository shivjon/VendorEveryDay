import React, { useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import TaskScreens from  '../Screens/TaskScreens';
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import HomeScreen from "../Screens/HomeScreen";
// import TaskManageScreen from "../Screens/TaskManageScreen";
import AddProductsScreen from "../Screens/AddProductsScreen";
import UpdateProductsScreen from '../Screens/UpdateProductsScreen';

const Stack = createStackNavigator();



 export const  AppNavigator = (props) => {
     const { user } = props
    return (
        <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={user}
                    headerMode='none'
                >
                   
                    {/* <Stack.Screen name='LoginScreen' component={LoginStack} /> */}
                       
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
            {/* <Stack.Screen name='TaskScreens' component={TaskScreens} /> */}
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            {/* <Stack.Screen name='TaskManageScreen' component={TaskManageScreen} /> */}
            <Stack.Screen name='AddProductsScreen' component={AddProductsScreen} />
            <Stack.Screen name='UpdateProductsScreen' component={UpdateProductsScreen} />
            
                </Stack.Navigator> 
        </NavigationContainer>
    )
}

export default AppNavigator;