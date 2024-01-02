import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image, StyleSheet } from 'react-native'
import welcomeImg from "../assets/saverecipe.jpg"
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
} from 'react-native-reanimated';

const Welcome = () => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-100)

    const fadeInImage = () => {
        opacity.value = withTiming(1, { duration: 2000 });
        translateY.value = withSpring(0, { duration: 2000 });
    };

    const fadeInText = () => {
        opacity.value = withTiming(1, { duration: 3000 });
    };

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
    useEffect(() => {
        fadeInImage();
        fadeInText(); // Call fadeInText here if you want to fade in text separately


        // setTimeout(() => navigation.navigate(''), 3000)
    }, []);
    return (
    <View style={{ flex: 1, backgroundColor: '#0a0a11', alignItems: 'center',  }}>
            <StatusBar style='dark' />
           
            <Animated.View style={[Styles.imgContainer, ImageAnimatedStyle]}>
                <Image source={welcomeImg} style={Styles.img} />
            </Animated.View>
            <Animated.View style={[Styles.txtContainer, TextAnimatedStyle]}>
                <Text style={Styles.text}>Welcome To </Text>
                {/* <Text style={Styles.text}>Flavor Nest</Text> */}
            </Animated.View>
        </View>
    )
}

export default Welcome

const Styles = StyleSheet.create({
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        backgroundColor: '#EEF0E5',
        width: wp('100%'),
        height: '80%',
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
        // fontFamily:
    },
});
