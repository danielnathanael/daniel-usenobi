import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import Service from './../../services/Services'
import { MMKVLoader } from 'react-native-mmkv-storage'

const storage = new MMKVLoader().initialize()
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(null)
    const [obscurePassword, setObscurePassword] = useState(true)
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        setEmail(email)
        const regex = RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
        if (regex.test(email)) {
            setEmailErrorMsg(null)
        } else {
            setEmailErrorMsg('Invalid Email Address')
        }
    }

    const validatePassword = (password) => {
        setPassword(password)
        if (password.length > 0) {
            setPasswordErrorMsg(null)
        } else {
            setPasswordErrorMsg('Invalid Password')
        }
    }

    const login = async () => {
        try {
            validateEmail(email)
            validatePassword(password)

            if (emailErrorMsg == null && passwordErrorMsg == null && loading == false) {
                setLoading(true)

                console.log(email)
                console.log(password)

                let result = await Service.login(email, password)
                console.log(result)
                if (result.status === 200) {
                    await storage.setStringAsync("token", result.data.token)
                    navigation.navigate('Home')
                } else {
                    console.log(result)
                    Alert.alert('Error', JSON.stringify(result.data))
                }

                setLoading(false)
            }
        } catch (error) {
            Alert.alert('Error', 'Request Error')
            setLoading(false)
        }
    }

    return <View style={styles.screen}>
        <LinearGradient colors={['#102445', '#000000']} style={styles.screen}>
            <View style={styles.header}>
                <Image source={require('./assets/nobi-icon.png')} />
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.inputLabel}>E-mail Address</Text>
                    <View>
                        <TextInput
                            editable={true}
                            style={styles.emailInput}
                            placeholder='Enter E-mail Address'
                            keyboardType='email-address'
                            onChangeText={(text) => validateEmail(text)}
                        />
                    </View>
                    <Text style={styles.errorLabel}>{emailErrorMsg}</Text>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            editable={true}
                            style={styles.passwordInput}
                            placeholder='Enter Password'
                            secureTextEntry={obscurePassword}
                            onChangeText={(text) => validatePassword(text)}
                        />
                        <Icon
                            name={obscurePassword ? 'eye-off' : 'eye'}
                            size={20}
                            onPress={() => setObscurePassword(!obscurePassword)}
                            style={styles.passwordSuffix}
                        />
                    </View>
                    <Text style={styles.errorLabel}>{passwordErrorMsg}</Text>
                </View>
                <View>
                    <Pressable
                        onPress={() => login()}
                        style={styles.loginButton}
                    >
                        {
                            loading ?
                                <ActivityIndicator color={styles.loginButtonText.color} size={20} />
                                :
                                <Text style={styles.loginButtonText}>Login</Text>
                        }
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    inputLabel: {
        fontSize: 16,
        marginVertical: 8,
    },
    errorLabel: {
        fontSize: 12,
        color: '#ffd700',
        fontStyle: 'italic',
        marginVertical: 8,
    },
    emailInput: {
        fontSize: 16,
        backgroundColor: '#152f5a',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    passwordContainer: {
        fontSize: 16,
        backgroundColor: '#152f5a',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    passwordInput: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flex: 1,
    },
    passwordSuffix: {
        paddingHorizontal: 16,
    },
    loginButton: {
        backgroundColor: '#1044fc',
        paddingVertical: 8,
        borderRadius: 4,
        marginHorizontal: 16,
        marginVertical: 8,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginButtonText: {
        fontSize: 16,
        color: 'white',
    }
})

export default Login