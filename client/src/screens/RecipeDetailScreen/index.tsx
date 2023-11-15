import React, {useEffect, useState} from 'react';
import RecipeDetailScreen from './view';
import {MealDto} from 'src/utils/data-dto';
import axios from 'axios';

export default function (props) {
  const [meal, setMeal] = useState<MealDto>(null);
  const [loading, setLoading] = useState(true);
  let item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const getMealData = async (id: any) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      //   console.log('got meal data: ',response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);
  return (
    <RecipeDetailScreen
      meal={meal}
      loading={loading}
      isFavorite={isFavorite}
      setIsFavorite={setIsFavorite}
      item={item}
    />
  );
}
