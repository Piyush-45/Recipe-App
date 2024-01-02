import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import Loader from '../components/Loader';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';


import { AppAuthenticationContext } from '../context/useAuth';
import { doc, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { recipeRef } from '../Firebase';
const RecipeDetailScreen = () => {

    const { favorites, setFavorites, user } = useContext(AppAuthenticationContext)
    const navigation = useNavigation()
    const route = useRoute();
    const { recipeId } = route.params;
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
                const result = await response.json();


                if (result.meals && result.meals.length > 0) {
                    setRecipeDetails(result.meals[0]);
                }
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();

    }, [recipeId]);
    // In the RecipeDetailScreen component
    const toggleFavorite = async () => {
        try {
            // Check if the recipe is already in favorites
            if (favorites.includes(recipeId)) {
                // Recipe is already in favorites, remove it
                setFavorites(favorites.filter((id) => id !== recipeId));

                // Remove the recipe from Firestore
                const recipeDocRef = doc(recipeRef, user.uid, recipeId);
                await recipeDocRef.delete();
            } else {
                // Recipe is not in favorites, add it
                setFavorites([...favorites, recipeId]);

                // Get the recipe details
                const recipeData = {
                    userId: user.uid,
                    name: recipeDetails.strMeal,
                    imageUrl: recipeDetails.strMealThumb,
                    timestamp: serverTimestamp(),
                };

                // Create a DocumentReference using the user ID and recipeId
                const recipeDocRef = doc(recipeRef, user.uid, 'recipes', recipeId);

                // Set the recipe data in Firestore
                await setDoc(recipeDocRef, recipeData);

                console.log("Recipe added with ID: ", recipeId);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };




    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    const ingredientsIndexes = (recipeDetails) => {
        if (!recipeDetails) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (recipeDetails['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    }
    // Extract and set ingredients (total 20 ing ho sakte hai max jisme alag alag recipe different no of ing hai)


    if (loading) {
        return (

            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>

        );
    }

    if (!recipeDetails) {
        return (
            <SafeAreaView >
                <View style={styles.errorContainer}>
                    <Text>Error loading recipe details</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (

        <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
            <ScrollView>

                {loading ? (<Loader />) : (
                    <>
                        <View style={styles.container}>
                            <Image source={{ uri: recipeDetails.strMealThumb }} style={styles.image} />
                        </View>

                        <Animated.View entering={FadeIn.delay(200).duration(1000)} style={styles
                            .iconContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ padding: 3.5, borderRadius: 50, backgroundColor: 'white', marginLeft: 5 }}>

                                <ChevronLeftIcon size={hp(4)} strokeWidth={4.5} color="#129575" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={toggleFavorite} style={{ backgroundColor: 'white', marginRight: 6, padding: 3.5, borderRadius: 50 }}>
                                <HeartIcon size={hp(4)} strokeWidth={4.5} color={favorites.includes(recipeId) ? "red" : "gray"} />
                            </TouchableOpacity>

                        </Animated.View>
                    </>
                )}

                {/* description */}
                {loading ?
                    (<Loader />) : (
                        <View style={styles.mealDescContainer}>
                            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{ marginTop: 2 }}>
                                <Text style={styles.mealName}>
                                    {recipeDetails.strMeal}
                                </Text>
                                <Text style={styles.mealCountry}>{recipeDetails.strArea}</Text>
                            </Animated.View>

                            {/* // misc */}

                            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={styles.miscContainer}>
                                <View style={{
                                    display: 'flex', alignItems: 'center', backgroundColor: '#129575', justifyContent: 'center',
                                    // height: 70, 
                                    borderRadius: 35, padding: 4
                                }}>

                                    <View style={{ height: hp(6), width: hp(6), backgroundColor: 'white', borderRadius: hp(3), display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                        <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                    </View>
                                    <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 4, marginTop: 2 }}>
                                        <Text style={styles.time}>35</Text>
                                        <Text style={{ fontSize: hp(1.3), color: '#fff' }}>min</Text>
                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#129575',
                                    // height: 70, 
                                    borderRadius: 50, padding: 3
                                }}>

                                    <View style={{ height: hp(6), width: hp(6), backgroundColor: 'white', borderRadius: hp(3), display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                        <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                    </View>
                                    <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 4, marginTop: 2 }}>
                                        <Text style={styles.time}>3</Text>
                                        <Text style={{ fontSize: hp(1.3), color: 'white' }}>Servings</Text>
                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#129575',
                                    // height: 70, 
                                    borderRadius: 50, padding: 3
                                }}>

                                    <View style={{ height: hp(6), width: hp(6), backgroundColor: 'white', borderRadius: hp(3), display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                    </View>
                                    <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 4, marginTop: 2 }}>
                                        <Text style={styles.time}>103</Text>
                                        <Text style={{ fontSize: hp(1.3), color: '#fff' }}>Cal</Text>
                                    </View>
                                </View>

                                <View style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#129575',
                                    // height: 70, 
                                    borderRadius: 50, padding: 3
                                }}>

                                    <View style={{ height: hp(6), width: hp(6), backgroundColor: 'white', borderRadius: hp(3), display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252' />

                                    </View>
                                    <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 4, marginTop: 2 }}>
                                        {/* <Text style={styles}></Text> */}
                                        <Text style={{ fontSize: hp(1.3), color: 'white' }}>Easy</Text>
                                    </View>
                                </View>
                            </Animated.View>


                            {/* ingredients */}

                            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={{ marginTop: 12 }}>
                                <Text style={styles.ingHeading}>Ingredients</Text>
                                <View style={styles.ingContainer}>
                                    {ingredientsIndexes(recipeDetails).map(i => (
                                        <View key={i} style={styles.ingredientItem}>
                                            <View style={styles.ingredientBullet} />
                                            <View style={styles.ingredientTextContainer}>
                                                <Text style={styles.ingredientMeasure}>
                                                    {recipeDetails['strMeasure' + i]}
                                                </Text>
                                                <Text style={styles.ingredientName}>
                                                    {recipeDetails['strIngredient' + i]}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </Animated.View>

                            {/* instructions */}
                            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={styles.instructionsContainer}>
                                <Text style={styles.mealName}>Instructions</Text>
                                <Text style={styles.instructionPara}>
                                    {
                                        recipeDetails?.strInstructions
                                    }
                                </Text>
                            </Animated.View>


                            {/* youtube video */}
                            {
                                recipeDetails?.strYoutube && (
                                    <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={{ marginTop: 10 }}>
                                        <Text style={styles.mealName}>Recipe Video</Text>

                                        <YoutubeIframe webViewProps={{
                                            overScrollMode: "never" // a fix for webview on android - which didn't work :(
                                        }}
                                            videoId={getYoutubeVideoId(recipeDetails.strYoutube)}
                                            height={hp(30)}>

                                        </YoutubeIframe>
                                    </Animated.View>
                                )
                            }
                        </View>
                    )}
            </ScrollView>
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: wp(98),
        height: hp(50),
        borderRadius: 53,
        objectFit: 'cover',
        borderBottomRightRadius: 40,
        marginTop: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    category: {
        fontSize: 16,
        marginBottom: 8,
    },
    instructions: {
        fontSize: 18,
    },
    iconContainer: {
        width: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(5),
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    mealDescContainer: {
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 4,
        paddingTop: 8,
    },
    mealName: {
        fontSize: hp(3),
        fontWeight: 'bold',
        flex: 1,
        color: '#000000',
    },
    mealCountry: {
        fontSize: hp(2),
        fontWeight: '400',
        color: 'gray',
    },
    miscContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    time: {
        fontSize: hp(2),
        fontWeight: 'bold',
        color: 'white'
    },
    ingContainer: {
        marginTop: 10,
    },
    ingHeading: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        flex: 1,
        color: '#000',
        marginBottom: 8,
    },
    instructionsContainer: {
        marginTop: 12,
    },
    instructionPara: {
        fontSize: hp(1.8),
        color: '#607274',
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ingredientBullet: {
        height: hp(1.5),
        width: hp(1.5),
        backgroundColor: '#71b1a1',
        borderRadius: hp(0.75),
        marginRight: 8,
    },
    ingredientTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientMeasure: {
        fontSize: hp(1.7),
        fontWeight: 'bold',
        marginRight: 4,
        color: '#4A5568',
    },
    ingredientName: {
        fontSize: hp(1.7),
        fontWeight: '500',
        color: '#FF3030',
    },
});

export default RecipeDetailScreen;

