
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppAuthenticationContext } from './context/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import RecipeDetail from './screens/RecipeDetail';
import Signup from './screens/Signup';
import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import SavedRecipes from './screens/SavedRecipes';
import { HomeIcon, UsersIcon,BookmarkIcon } from 'react-native-heroicons/solid';
import CustomDrawer from './components/CustomDrawer';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
    const { user } = useContext(AppAuthenticationContext);
    

    return (
        
            <NavigationContainer>
            
            {user ? (
                <Drawer.Navigator screenOptions={{ headerShown: false,drawerStyle:{width:widthPercentageToDP('80%'),} }}  drawerContent={(props)=> <CustomDrawer {...props}/>}>
                    <Drawer.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            drawerActiveTintColor: '#71b1a1',
                            drawerIcon: () => <HomeIcon size={22} color='#129575' />,
                            drawerLabelStyle: { fontWeight: '500',color:'#000', fontSize:18 },
                           
                        }}
                    />
                    <Drawer.Screen
                        name="Saved Recipes"
                        component={SavedRecipes}
                        options={{
                            // drawerActiveTintColor: '#86A789',
                            drawerIcon: () => <BookmarkIcon size={22} color={'#129575'} />,
                            drawerLabelStyle: { fontWeight: '700',color:'#000',fontSize:18 },
                        }}
                    />
                     <Drawer.Screen
                        name="detail"
                        component={RecipeDetail}
                        options={{ headerShown: false, drawerLabel: () => null }}
                    />
                     
                </Drawer.Navigator>
                
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="splash" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
                    <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                    {/* <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} /> */}
                    <Stack.Screen name='detail' component={RecipeDetail} options={{ headerShown: false }} />
                </Stack.Navigator>
                
            )}
           
            
        </NavigationContainer>
    );
};

