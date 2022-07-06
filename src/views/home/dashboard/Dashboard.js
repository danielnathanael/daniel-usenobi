import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { MMKVLoader } from 'react-native-mmkv-storage'
import Icon from 'react-native-vector-icons/Feather'
import Services from '../../../services/Services'

const storage = new MMKVLoader().initialize()
const Dashboard = ({ navigation }) => {
    const [change24H, setChange24H] = React.useState(0)
    const [totalAsset, setTotalAsset] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [depositLoading, setDepositLoading] = React.useState(false)

    const logout = async () => {
        await storage.removeItem('token')
        navigation.replace('Landing')
    }

    const deposit = async () => {
        setDepositLoading(true)

        //do something related to deposit
        await new Promise(r => setTimeout(r, 5000))

        setDepositLoading(false)
    }

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true)
            let token = await storage.getStringAsync('token')
            if (token != null) {
                let result = await Services.getDashboard(token)
                if (result.status === 200) {
                    setChange24H(parseFloat(result.data['24hourchange']))
                    setTotalAsset(parseFloat(result.data['total_asset']))
                }
            }

            setLoading(false)
        }

        fetchDashboard()
    }, [])

    let label24H = `${change24H > 0 ? '+' : '-'}${change24H.toFixed(2)}%`
    let label24HStyle = StyleSheet.create({
        fontWeight: 'bold',
        color: change24H > 0 ? '#05b58c' : 'red',
    })

    return <View style={styles.screen}>
        <LinearGradient colors={['#102445', '#000000']} style={styles.screen}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => logout()}
                >
                    <Icon name='log-out' size={24} style={styles.headerIcon} />
                </Pressable>
            </View>
            <View style={styles.adsContainer}>
                <Image source={require('./assets/ads.png')} style={styles.ads} />
            </View>
            <View style={styles.body}>
                {
                    loading ?
                        <ActivityIndicator color={styles.loading.color} size={20} />
                        :
                        <View style={styles.dashboardValueContainer}>
                            <View style={styles.change24HContainer}>
                                <Text>24H Changes</Text>
                                <Text style={label24HStyle}> {label24H}</Text>
                            </View>
                            <Text style={styles.totalAsset}> {`$${totalAsset.toFixed(2)}`}</Text>
                            <Pressable
                                style={{
                                    ...styles.depositButton,
                                    backgroundColor: depositLoading ? 'grey' : '#05b58c',
                                }}
                                onPress={() => deposit()}
                            >
                                <Icon name='download' color='#ffffff' size={16} style={styles.depositButtonIcon} />
                                <Text style={styles.depositButtonText}>Deposit</Text>
                            </Pressable>
                        </View>
                }
            </View>
        </LinearGradient>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    header: {
        margin: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerIcon: {
        color: 'white',
        padding: 4,
    },
    body: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    adsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ads: {
        margin: 16,
    },
    loading: {
        color: '#ffffff',
    },
    dashboardValueContainer: {
        display: 'flex',
        alignItems: 'stretch',
    },
    change24HContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    totalAsset: {
        paddingVertical: 8,
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    depositButton: {
        padding: 8,
        margin: 32,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    depositButtonIcon: {
        marginRight: 8,
    },
    depositButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Dashboard