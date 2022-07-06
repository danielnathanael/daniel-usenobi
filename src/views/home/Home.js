import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from './dashboard/Dashboard'
import { Image, View, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import List from './list/List'

const Tab = createBottomTabNavigator()

const Home = () => {
    return <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName='Dashboard'
    >
        <Tab.Screen name="List" component={List} options={{
            headerShown: false,
        }} />
        <Tab.Screen name="Dashboard" component={Dashboard} options={{
            headerShown: false,
        }} />
    </Tab.Navigator>
}

const TabBar = ({ state, descriptors, navigation }) => {
    return <View style={styles.tabBarContainer}>
        <Pressable
            style={styles.tabBarButton}
            onPress={() => navigation.navigate('List')}
        >
            <Icon name='graph' size={24} color='white' />
        </Pressable>
        <Pressable
            style={styles.tabBarButton}
            onPress={() => navigation.navigate('Dashboard')}
        >
            <Image source={require('./assets/nobi.png')} />
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    tabBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        backgroundColor: '#000000',
        height: 50,
    },
    tabBarButton: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    }
})

export default Home