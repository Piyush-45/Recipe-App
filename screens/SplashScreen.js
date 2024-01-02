import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
} from 'react-native-reanimated';
import splashImg2 from '../assets/splashimg2.png';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = () => {
    // ^ navigation 
    const navigation = useNavigation()

    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-100);

    const fadeInImage = () => {
        opacity.value = withTiming(1, { duration: 2000 });
        translateY.value = withSpring(0, { duration: 2000 });
    };

    const fadeInText = () => {
        opacity.value = withTiming(1, { duration: 3000 });
    };

    useEffect(() => {
        fadeInImage();
        fadeInText(); // Call fadeInText here if you want to fade in text separately


        setTimeout(()=> navigation.navigate('signup'),3000)
    }, []);

    const ImageAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    const TextAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            // transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0a11', alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar style='light'/>
            <Animated.View style={[Styles.txtContainer,TextAnimatedStyle]}>
                <Text style={Styles.text}>Savory &</Text>
                <Text style={Styles.text}>Sweet</Text>
            </Animated.View>
            <Animated.View style={[Styles.imgContainer, ImageAnimatedStyle]}>
                <Image source={splashImg2} style={Styles.img} />
            </Animated.View>
        </SafeAreaView>
    );
};

export default SplashScreen;

const Styles = StyleSheet.create({
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        backgroundColor: '#EEF0E5',
        width: wp('50%'),
        height: wp('50%'),
        borderRadius: wp('25%'),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    text: {
        color: 'white',
        fontSize: 40,
    },
});
