import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './views/login/Login'
import Landing from './views/landing/Landing'
import Home from './views/home/Home'

const Stack = createNativeStackNavigator()

const Routes = () => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen
                name='Landing'
                component={Landing}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Routes