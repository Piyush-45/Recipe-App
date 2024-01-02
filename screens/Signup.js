import { View, Text } from 'react-native'

import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { AppAuthenticationContext } from '../context/useAuth'
import { ActivityIndicator } from 'react-native'
import user from "../assets/user.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
// import Video from 'react-native-video'

const Signup = () => {
    const navigation = useNavigation()
    const { email, setEmail, username, setUsername, signUp, password, setPassword, loading, signInWithGoogle } = useContext(AppAuthenticationContext)


    return (
        <SafeAreaView style={styles.signupContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Create an account</Text>
                    <Text style={{ color: '#121212', fontWeight: '400', }}>Let’s help you set up your account, it won’t take long.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={user} style={styles.inputImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}

                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={emailIcon} style={styles.inputImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image source={passwordIcon} style={styles.inputImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                </View>

                {loading ? (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
                    <ActivityIndicator color={'#F05941'} size={'large'} />

                </View>) : (
                    <TouchableOpacity style={styles.btn} onPress={signUp}>
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </TouchableOpacity>

                )}
                {/* <View>
                    <TouchableOpacity style={styles.btn} onPress={signInWithGoogle}>
                        <Text style={{ color: 'white' }}>Sign In with Google</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.signInContainer}>
                    <Text style={{ fontWeight: '500' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={styles.signInText}>Sign In!</Text>
                    </TouchableOpacity>
                </View>

                {/* <LottieView source={require('../assets/foodchoice.json')} autoPlay loop onError={(error) => console.error('Lottie Error:', error)}/> */}
            </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
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
        marginLeft: 10,
    },
    btn: {
        backgroundColor: '#00B4BF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 50,
        marginTop: 20,
        width: '100%',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signInText: {
        marginLeft: 5,
        color: '#ff9c00',
        fontWeight: '500',
        // lineHeight: normal;
    },
});
export default Signup