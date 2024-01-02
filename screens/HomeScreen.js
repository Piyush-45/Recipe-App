import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import avator from "../assets/avator.jpeg"

import { Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CategoryList from '../components/CategoryList'
import Recipes from '../components/Recipes'
import { useNavigation } from '@react-navigation/native'
import { DataContext } from '../context/useFetch'

const HomeScreen = () => {
    const { searchQuery, setSearchQuery, data } = useContext(DataContext);

    const navigation = useNavigation();

    const handleAvatarPress = () => {
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='dark' />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
                {/* avator and hello container*/}
                <View style={styles.avatarContainer}>
                    <View style={styles.greetings}>
                        <Text style={styles.hello}>Hello Piyush</Text>
                        <Text style={styles.question}>What are you cooking today ?</Text>
                    </View>
                    <TouchableOpacity onPress={handleAvatarPress}>
                        <Image source={avator} style={{ height: hp(6), width: hp(5), objectFit: 'contain' }} />
                    </TouchableOpacity>
                </View>

                {/* searchBar */}
                <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Search recipe'
                            style={styles.textInput}
                            value={searchQuery}
                            onChangeText={(query) => setSearchQuery(query)}
                        />
                    </View>
                </KeyboardAvoidingView>

                {/* category list  */}
                <View>
                    <CategoryList />
                </View>

                {/* RECIPES */}
                <Recipes/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    scrollview: {
        paddingBottom: 50,
        paddingTop: 6,
        marginHorizontal: 12,


    },
    greetings: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    hello: {
        fontSize: 22,
        fontWeight: '600',

    },
    question: {
        fontSize: 16,
        fontWeight: '400',
        color: '#A9A9A9'
    },

    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    inputContainer: {
        // backgroundColor:'red',
        marginTop: 8,
        padding: 6,
        width: "100%",
        borderRadius: 30,
        borderColor: '#00B4BF',
        borderWidth: 2,
        backgroundColor: '#F1F1F1'


    },
    textInput: {
        fontSize: 18,
        padding: 4,


    }
})