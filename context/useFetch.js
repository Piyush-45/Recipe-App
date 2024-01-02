import { createContext,useState,useEffect  } from "react";
import breakfastImage from "../assets/breakfasr.jpg";
import dessertImage from "../assets/dessert.jpg";
import seafoodImage from "../assets/seafood.jpg";
import veganImage from "../assets/vegan.jpeg";
import vegetarianImage from "../assets/vegetarian.jpg";
import chickenImage from "../assets/chicken.jpg";
export const DataContext = createContext()

export const DataContextProvider = ({children})=>{
    const [activeCategory, setActiveCategory] = useState('Breakfast');
    const [searchQuery, setSearchQuery] = useState('');

    const[loading,setLoading] = useState(false);

    const categories = [
        {
          name: 'Breakfast',
          image: breakfastImage,
        },
        {
          name: 'Vegetarian',
          image: vegetarianImage,
        },
        {
          name: 'Vegan',
          image: veganImage,
        },
        {
          name: 'Dessert',
          image: dessertImage,
        },
        {
          name: 'Seafood',
          image: seafoodImage,
        },
        {
          name: 'Chicken',
          image: chickenImage,
        },
      ];

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`);
            const result = await response.json();
            setData(result.meals || []);
            setLoading(false)
            // console.log(typeof())
          } catch (error) {
            // setLoading(false)
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [activeCategory]);
   
    

    return(
        <DataContext.Provider value={{activeCategory,setActiveCategory,data,categories,loading,searchQuery,setSearchQuery}}>
            {children}
        </DataContext.Provider>
    )
}