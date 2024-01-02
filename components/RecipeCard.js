import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({ id, index, item, navigation }) => {
  let isEven = index % 2 === 0;

  const handleItemPress = () => {
    // Navigate to RecipeDetail and pass the recipe ID
    navigation.navigate('detail', { recipeId: id });
  };

  
  return (
    <Animated.View entering={FadeInDown.duration(600).springify().damping(12)}>
      <TouchableOpacity
        onPress={handleItemPress}
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8, 
          paddingRight: isEven ? 8 : 0,
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2,
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            height: index % 3 === 0 ? heightPercentageToDP(25) : heightPercentageToDP(35),
            borderRadius: 35,
            objectFit: 'cover',
          }}
        />
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', marginBottom: 6 }}>
        {item.strMeal}
      </Text>
    </Animated.View>
  );
};

export default RecipeCard