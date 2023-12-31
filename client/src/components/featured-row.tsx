import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from 'src/config/theme';
import AppText from './app-text';
import RestaurantCard from './restaurant-card';
import {getFeaturedRestaurantById} from 'src/apis';

export default function FeatureRow({id, item}: any) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getFeaturedRestaurantById(id).then(data => {
      // console.log('got data: ',data);
      setRestaurants(data?.restaurants);
    });
  }, [id]);
  // console.log(resturants);

  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <AppText className="font-bold text-lg">{item?.title}</AppText>
          <AppText className="text-gray-500 text-xs">
            {item?.description}
          </AppText>
        </View>

        <TouchableOpacity>
          <AppText style={{color: themeColors.text}} className="font-semibold">
            See All
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5">
        {item?.restaurants.map((restaurant, index) => {
          return (
            <RestaurantCard
              key={restaurant._id || index}
              id={restaurant._id}
              // imgUrl={restaurant.image}
              // title={restaurant.name}
              // rating={restaurant.rating}
              // type={restaurant.type?.name}
              // address="123 main street"
              // description={restaurant.description}
              // dishes={restaurant.dishes}
              // lng={restaurant.lng}
              // lat={restaurant.lat}
              restaurant={restaurant}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
