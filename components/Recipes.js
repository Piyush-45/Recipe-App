import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { DataContext } from '../context/useFetch';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tick from "../assets/end.png"
import RecipeCard from './RecipeCard';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
const Recipes = () => {
  const navigation = useNavigation();
  const { data, loading, searchQuery } = useContext(DataContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Filter recipes based on search query
    const filteredData = data.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filteredData);
  }, [data, searchQuery]);


  // const renderListFooter = () => (
  //   <View style={styles.listFooter}>
  //     <Image source={tick} />
  //     <Text style={styles.listFooterText}>You are all caught up</Text>
  //   </View>
  // );

  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.heading}>Recipes</Text>

      <MasonryList
        data={filteredRecipes.map((item, index) => ({ ...item, index }))}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        // LoadingView={loadingView}
        renderItem={({ item }) => (
          <RecipeCard id={item.idMeal} item={item} index={item.index} navigation={navigation} />
        )}
        onEndReached={0.1}

      />
      <View style={styles.listFooter}>
        <Image source={tick} />
        <Text style={styles.listFooterText}>You are all caught up</Text>
      </View>
    </View>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  heading: {
    fontSize: hp(4),
    fontWeight: '700',
  },
  listFooter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  listFooterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F05941',
  },
});
