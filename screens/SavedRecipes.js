import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { FIREBASE_DB, recipeRef } from '../Firebase';
import { AppAuthenticationContext } from '../context/useAuth';

const SavedRecipes = () => {
  const { user } = useContext(AppAuthenticationContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.uid) {
          console.warn('User information not available');
          return;
        }

        const recipesQuery = query(
          collection(FIREBASE_DB, 'userSavedRecipes'),
          where('userId', '==', user.uid)
        );

        const snapshot = await getDocs(recipesQuery);
        const recipesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log('Recipes Data:', recipesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
            <Text>{item.name}</Text>
            {/* Add more components to display other recipe details */}
          </View>
        )}
      />
    </View>
  );
};

export default SavedRecipes;
