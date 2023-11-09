import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {urlFor} from '../sanity';
// import DishRow from '../components/dishRow';
// import BasketIcon from 'src/components/basketIcon';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, themeColors} from 'src/config/theme';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import DishRow from 'src/components/dish-row';
import VectorIcon from 'src/components/vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
import BasketIcon from 'src/components/basket-icon';
// import {selectResturant, setResturant} from '../slices/resturantSlice';
// import {emptyBasket} from '../slices/basketSlice';

export default function RestaurantScreen() {
  const navigation = useNavigation();
  // const resturant = useSelector(selectResturant);
  // let dispatch = useDispatch();
  const {
    params: {item},
  } = useRoute();
  // useLayoutEffect(() => {
  //   navigation.setOptions({headerShown: false});
  // }, []);
  // useEffect(() => {
  //   if (resturant && resturant.id != id) {
  //     dispatch(emptyBasket());
  //   }
  //   dispatch(
  //     setResturant({
  //       id,
  //       title,
  //       imgUrl,
  //       rating,
  //       type,
  //       address,
  //       description,
  //       dishes,
  //       lng,
  //       lat,
  //     }),
  //   );
  // }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <AppImage
            className="w-full h-72"
            // source={{uri: urlFor(imgUrl).url()}}
            source={item?.image}
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
                    {item?.type}
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
            return (
              <DishRow
                key={dish._id || dish?.id}
                id={dish._id || dish?.id}
                // name={dish.name}
                // description={dish.description}
                // price={dish.price}
                // image={dish.image}
                item={dish}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
