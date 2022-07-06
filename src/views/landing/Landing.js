import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { MMKVLoader } from 'react-native-mmkv-storage'

const storage = new MMKVLoader().initialize()
const Landing = ({ navigation }) => {

    useEffect(() => {
        const checkToken = async () => {
            let token = await storage.getStringAsync('token')

            if(token != null) {
                navigation.replace('Home')
            } else {
                navigation.replace('Login')
            }
        }

        checkToken()
    }, [])

    return <View style={styles.screen}>
        <LinearGradient colors={['#102445', '#000000']} style={styles.screen}>
            <ActivityIndicator color={styles.loading.color} size={20} />
        </LinearGradient>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    loading: {
        color: '#ffffff'
    }
})

export default Landing