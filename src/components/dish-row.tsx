import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
// import {urlFor} from '../sanity';
import {useDispatch, useSelector} from 'react-redux';
import AppImage from './app-image';
import {themeColors} from 'src/config/theme';
import AppText from './app-text';
import VectorIcon from './vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
// import {
//   addToBasket,
//   removeFromBasket,
//   selectBasketItemsById,
// } from '../slices/basketSlice';

export default function DishRow({item}: any) {
  //   const dispatch = useDispatch();
  //   const basketItems = useSelector(state => selectBasketItemsById(state, id));
  //   const handleIncrease = () => {
  //     dispatch(addToBasket({id, name, price, image, description}));
  //   };
  //   const handleDecrease = () => {
  //     dispatch(removeFromBasket({id}));
  //   };
  return (
    <>
      <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <AppImage
          className="rounded-3xl"
          style={{height: 100, width: 100}}
          //   source={{
          //     uri: urlFor(image).url(),
          //   }}
          source={item?.image}
        />
        <View className="flex flex-1 space-y-3">
          <View className="pl-3">
            <AppText className="text-xl">{item?.name}</AppText>
            <AppText className="text-gray-700">{item?.description}</AppText>
          </View>
          <View className="flex-row pl-3 justify-between items-center">
            <AppText className="text-gray-700 text-lg font-bold">
              ${item?.price}
            </AppText>
            <View className="flex-row items-center">
              <TouchableOpacity
                // onPress={handleDecrease}
                onPress={() => {}}
                // disabled={!basketItems.length}
                className="p-1 rounded-full"
                style={{backgroundColor: themeColors.bgColor(1)}}>
                {/* <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                /> */}
                <VectorIcon.MaterialCommunityIcons
                  name="minus-circle-outline"
                  size={getSize.m(20)}
                  color={'white'}
                />
              </TouchableOpacity>
              {/* <AppText className="px-3">{basketItems.length}</AppText> */}
              <AppText className="px-3">{'0'}</AppText>
              <TouchableOpacity
                // onPress={handleIncrease}
                onPress={() => {}}
                className="p-1 rounded-full"
                style={{backgroundColor: themeColors.bgColor(1)}}>
                {/* <Icon.Plus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                /> */}
                <VectorIcon.MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={getSize.m(20)}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
