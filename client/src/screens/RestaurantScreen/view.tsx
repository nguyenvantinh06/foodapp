import {View, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, themeColors} from 'src/config/theme';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import DishRow from 'src/components/dish-row';
import VectorIcon from 'src/components/vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
import BasketIcon from 'src/components/basket-icon';
import {
  selectRestaurant,
  setRestaurant,
} from 'src/store/slices/restaurant-slice';
import {emptyBasket} from 'src/store/slices/basket-slice';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {urlFor} from 'src/apis/sanity';

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const restaurant = useAppSelector(selectRestaurant);
  let dispatch = useAppDispatch();
  const {
    params: {item},
  } = useRoute();
  console.log('item restaurant', item);
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  useEffect(() => {
    if (restaurant && restaurant.id != item?.id) {
      dispatch(emptyBasket({}));
    }
    const {
      id,
      title,
      imgUrl,
      rating,
      type,
      address,
      description,
      dishes,
      lng,
      lat,
    } = item;
    dispatch(
      setRestaurant({
        id,
        title,
        imgUrl,
        rating,
        type,
        address,
        description,
        dishes,
        lng,
        lat,
      }),
    );
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <AppImage
            className="w-full h-72"
            source={{uri: urlFor(item?.image).url()}}
            // source={item?.image}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
            {/* <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} /> */}
            <VectorIcon.MaterialCommunityIcons
              name="arrow-left"
              color={themeColors.bgColor(1)}
              size={getSize.m(15)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <AppText className="text-3xl font-bold">{item?.title}</AppText>
            {/* copy this code from restaurant card */}
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <AppImage
                  source={require('src/assets/images/fullStar.png')}
                  className="h-4 w-4"
                />
                <AppText className="text-xs">
                  <AppText className="text-green-700">{item?.rating}</AppText>
                  <AppText className="text-gray-700">
                    {' '}
                    (4.6k review)
                  </AppText> ·{' '}
                  <AppText className="font-semibold text-gray-700">
                    {item?.type?.name}
                  </AppText>
                </AppText>
              </View>
              <View className="flex-row items-center space-x-1">
                {/* <Icon.MapPin color="gray" width={15} height={15} /> */}
                <VectorIcon.MaterialCommunityIcons
                  name="map-marker-outline"
                  size={getSize.m(15)}
                  color={COLORS.Grey}
                />
                <AppText className="text-gray-800 text-xs">
                  {' '}
                  Nearby · {item?.address}
                </AppText>
              </View>
            </View>
            <AppText className="text-gray-500 mt-2">
              {item?.description}
            </AppText>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <AppText className="px-4 py-4 text-2xl font-bold">Menu</AppText>
          {/* dishes */}
          {item?.dishes.map(dish => {
            console.log('dish', dish);
            return (
              <DishRow
                key={dish._id || dish?.id}
                id={dish._id || dish?.id}
                item={dish}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
