import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppAuthenticationContext } from '../context/useAuth';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const { email,user } = useContext(AppAuthenticationContext);

  const handleSignUpPress = () => {
    navigation.navigate('signup');
  };

  const handleSignInPress = () => {
    navigation.navigate('login');
  };

  useEffect(() => {
    // Any side effects or async operations can go here
  }, [email]);

  return (
    <SafeAreaView>
      <View>
        {user ? (
          <View>
            <Text>Welcome, {email}</Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignInPress}>
              <Text>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
