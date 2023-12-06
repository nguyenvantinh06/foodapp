import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppImage from './app-image';
import {themeColors} from 'src/config/theme';
import AppText from './app-text';
import VectorIcon from './vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsById,
} from 'src/store/slices/basket-slice';
import {urlFor} from 'src/apis/sanity';

export default function DishRow({item}: any) {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector(state =>
    selectBasketItemsById(state, item?.id),
  );
  const handleIncrease = () => {
    const {id, name, price, image, description} = item;
    dispatch(addToBasket({id, name, price, image, description}));
  };
  const handleDecrease = () => {
    const {id} = item;
    dispatch(removeFromBasket({id}));
  };
  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <AppImage
        className="rounded-3xl"
        style={{height: 100, width: 100}}
        source={{
          uri: urlFor(item?.image).url(),
        }}
        // source={item?.image}
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
              onPress={handleDecrease}
              disabled={!basketItems.length}
              className="p-1 rounded-full"
              style={{backgroundColor: themeColors.bgColor(1)}}>
              <VectorIcon.MaterialCommunityIcons
                name="minus-circle-outline"
                size={getSize.m(20)}
                color={'white'}
              />
            </TouchableOpacity>
            <AppText className="px-3">{basketItems.length}</AppText>
            <TouchableOpacity
              onPress={handleIncrease}
              className="p-1 rounded-full"
              style={{backgroundColor: themeColors.bgColor(1)}}>
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
  );
}
