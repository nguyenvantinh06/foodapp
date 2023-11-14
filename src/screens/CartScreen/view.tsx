import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {featuredDelivery} from 'src/utils/dummy-data';
import {themeColors} from 'src/config/theme';
import VectorIcon from 'src/components/vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import {SCENE_NAME} from 'src/utils/app-const';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {selectRestaurant} from 'src/store/slices/restaurant-slice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from 'src/store/slices/basket-slice';
// import { urlFor } from '../sanity';

export default function CartScreen() {
  const restaurant = useAppSelector(selectRestaurant);
  // const restaurant = featuredDelivery[0].restaurants[0];
  const [groupedItems, setGroupedItems] = useState([]);
  const basketItems = useAppSelector(selectBasketItems);
  const basketTotal = useAppSelector(selectBasketTotal);
  console.log('groupedItems', groupedItems);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const deliveryFee = 2;
  useMemo(() => {
    const gItems = basketItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(gItems);
    // console.log('items: ',gItems);
  }, [basketItems]);

  return (
    <View className=" bg-white flex-1">
      {/* top button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          style={{backgroundColor: themeColors.bgColor(1)}}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <VectorIcon.MaterialCommunityIcons
            name="arrow-left"
            color={'white'}
            size={getSize.m(12)}
          />
        </TouchableOpacity>
        <View>
          <AppText className="text-center font-bold text-xl">Your cart</AppText>
          <AppText className="text-center text-gray-500">
            {restaurant.title}
          </AppText>
        </View>
      </View>

      {/* delivery time */}
      <View
        style={{backgroundColor: themeColors.bgColor(0.2)}}
        className="flex-row px-4 items-center">
        <AppImage
          source={require('src/assets/images/bikeGuy.png')}
          className="w-20 h-20 rounded-full"
        />
        <AppText className="flex-1 pl-4">Deliver in 20-30 minutes</AppText>
        <TouchableOpacity>
          <AppText style={{color: themeColors.text}} className="font-bold">
            Change
          </AppText>
        </TouchableOpacity>
      </View>

      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-5"
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        {Object.entries(groupedItems).map(([key, items]) => {
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
              <AppText style={{color: themeColors.text}} className="font-bold">
                {items.length} x{' '}
              </AppText>
              <AppImage
                className="h-14 w-14 rounded-full"
                // source={{uri: urlFor(items[0]?.image).url()}}
                source={items[0]?.image}
              />
              <AppText className="flex-1 font-bold text-gray-700">
                {items[0]?.name}
              </AppText>
              <AppText className="font-semibold text-base">
                ${items[0]?.price}
              </AppText>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{backgroundColor: themeColors.bgColor(1)}}
                onPress={() => dispatch(removeFromBasket({id: items[0]?.id}))}>
                <VectorIcon.MaterialCommunityIcons
                  name="minus-circle-outline"
                  size={getSize.m(20)}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          );
        })}
        {/* {restaurant?.dishes?.map((dish, index) => {
          return (
            <View
              key={index}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
              <AppText style={{color: themeColors.text}} className="font-bold">
                2 x
              </AppText>
              <AppImage
                className="h-14 w-14 rounded-full"
                // source={{uri: urlFor(items[0]?.image).url()}}
                source={dish.image}
              />
              <AppText className="flex-1 font-bold text-gray-700">
                {dish.name}
              </AppText>
              <AppText className="font-semibold text-base">
                ${dish.price}
              </AppText>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{backgroundColor: themeColors.bgColor(1)}}
                onPress={() => dispatch(removeFromBasket({id: items[0]?.id}))}>
                <VectorIcon.MaterialCommunityIcons
                  name="minus-circle-outline"
                  size={getSize.m(20)}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          );
        })} */}
      </ScrollView>
      {/* totals */}
      <View
        style={{backgroundColor: themeColors.bgColor(0.2)}}
        className=" p-6 px-8 rounded-t-3xl space-y-4">
        <View className="flex-row justify-between">
          <AppText className="text-gray-700">Subtotal</AppText>
          <AppText className="text-gray-700">${basketTotal}</AppText>
        </View>
        <View className="flex-row justify-between">
          <AppText className="text-gray-700">Delivery Fee</AppText>
          <AppText className="text-gray-700">${deliveryFee}</AppText>
        </View>
        <View className="flex-row justify-between">
          <AppText className="font-extrabold">Order Total</AppText>
          <AppText className="font-extrabold">
            ${basketTotal + deliveryFee}
          </AppText>
        </View>
        <View>
          <TouchableOpacity
            style={{backgroundColor: themeColors.bgColor(1)}}
            onPress={() => navigation.navigate(SCENE_NAME.PREPARING_SCREEN)}
            className="p-3 rounded-full">
            <AppText className="text-white text-center font-bold text-lg">
              Place Order
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
