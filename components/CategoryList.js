import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated,{FadeInDown, FadeInUp} from 'react-native-reanimated';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { DataContext } from '../context/useFetch';

const CategoryList = () => {
  const {activeCategory, setActiveCategory,categories} = useContext(DataContext)
  
 

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {categories.map((category, index) => {
          const isSelected = activeCategory === category.name;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.name)}
              style={[styles.categoryContainer, isSelected && styles.selectedCategory]}
            >
              <Image
                source={category.image}
                style={{
                  width: heightPercentageToDP(8),
                  height: heightPercentageToDP(8),
                  borderRadius: heightPercentageToDP(4),
                  objectFit: 'contain',
                  borderWidth: isSelected ? 4 : 0,
                  borderColor: isSelected ? '#129575' : 'transparent',
                }}
              />
              <Text style={{ textAlign: 'center' }}>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  categoryContainer: {
    marginRight: 10,
  },
  selectedCategory: {
    borderColor: '#129575',
    borderRadius: 3,
  },
});

export default CategoryList;
