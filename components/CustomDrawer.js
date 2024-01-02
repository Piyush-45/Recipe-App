import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppAuthenticationContext } from '../context/useAuth';
import avator from "../assets/avator.jpeg";
import bg from "../assets/h.jpg"
const CustomDrawer = (props) => {
    const { signOut, username, email } = useContext(AppAuthenticationContext);

    return (
        // <ImageBackground source={bg}>
            <View style={styles.container}>
                <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.header}>
                        <Image source={avator} style={styles.headerImage} />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.userName}>{username}</Text>
                            <Text style={styles.email}>{email}</Text>
                        </View>
                    </View>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                    <View style={styles.additionalInfoContainer}>
                        <Text style={styles.additionalInfoText}>From Kitchen to Heart! 💖</Text>
                    </View>
                </View>
            </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: heightPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(2), 
        
    },
    scrollViewContent: {
        height: heightPercentageToDP('60%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: widthPercentageToDP(2),
        gap: widthPercentageToDP(6)
    },
    headerImage: {
        height: heightPercentageToDP(6),
        width: heightPercentageToDP(6),
        marginRight: widthPercentageToDP(2),
        resizeMode: 'contain',
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700'
    },
    email: {
        fontSize: 14,
        fontWeight: '400'
    },
    footer: {
        paddingHorizontal: widthPercentageToDP(2),
    },
    logoutButton: {
        marginBottom: widthPercentageToDP(4),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#B31312',
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    logoutButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    additionalInfoContainer: {
        alignItems: 'center',
    },
    additionalInfoText: {
        fontSize:18,
        fontWeight: '700',
        color: '#129575', //#ffc34d
        // greeen #129575
    },
});

export default CustomDrawer;
