import React, { useContext, } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import loginanim from "../assets/loginanim.json"
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppAuthenticationContext } from '../context/useAuth';

import { heightPercentageToDP } from 'react-native-responsive-screen';


const Login = () => {

    const navigation = useNavigation()
    const { email, setEmail, password, setPassword, signIn, loading } = useContext(AppAuthenticationContext)

    return (
        <SafeAreaView style={Styles.signupContainer}>
            <View style={Styles.container}>
                <View>
                    <Text style={Styles.heading}>Hello, </Text>
                    <Text style={{ fontSize: heightPercentageToDP(3) }}>Welcome Back! </Text>
                </View>
                <View style={Styles.inputContainer}>
                    <Image source={emailIcon} style={Styles.inputImage} />
                    <TextInput
                        style={Styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={Styles.inputContainer}>
                    <Image source={passwordIcon} style={Styles.inputImage} />
                    <TextInput
                        style={Styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                </View>
                {loading ? (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }} >
                    <ActivityIndicator color={'#F05941'} size={'large'} />
                </View>) : (
                    <TouchableOpacity style={Styles.btn} onPress={signIn}>
                        <Text style={{ color: 'white' }}>Sign In</Text>
                    </TouchableOpacity>

                )

                }
                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, alignContent: 'center' }}>
                    <Text style={{ fontWeight: '500' }}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text onPress={() => navigation.navigate('signup')} style={{ color: '#ff9c00', fontWeight: '500' }}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <LottieView source={loginanim} autoPlay loop style={{ height: heightPercentageToDP(100),backgroundColor:'red', width: 100,position:'absolute', top:'50%' }} /> */}
        </SafeAreaView >
    );
};

const Styles = StyleSheet.create({
    signupContainer: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#d9d9d9',
        borderWidth: 2,
        borderRadius: 16,
        width: '100%',
        height: 70,
    },
    input: {
        flex: 1,
        height: 70,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 16,
    },
    inputImage: {
        height: 25,
        objectFit: 'contain',
        marginLeft: 10, // Adjust the margin to your preference
    },
    btn: {
        backgroundColor: '#00B4BF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 50,
        marginTop: 20,
        // fontWeight:'00',
        width: '100%' // Add some margin for separation
    },
});

export default Login;
