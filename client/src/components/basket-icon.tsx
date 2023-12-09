import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from 'src/config/theme';
import AppText from './app-text';
import {SCENE_NAME} from 'src/utils/app-const';
import {useAppSelector} from 'src/store/hooks';
import {
  selectBasketItems,
  selectBasketTotal,
} from 'src/store/slices/basket-slice';

export default function BasketIcon() {
  const basketItems = useAppSelector(selectBasketItems);
  const basketTotal = useAppSelector(selectBasketTotal);
  const navigation = useNavigation();
  if (!basketItems.length) return null;
  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        style={{backgroundColor: themeColors.bgColor(1)}}
        onPress={() => navigation.navigate(SCENE_NAME.CART_SCREEN)}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg">
        <View
          className="p-2 px-4 rounded-full"
          style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
          <AppText className="font-extrabold text-white text-lg">
            {basketItems.length}
          </AppText>
        </View>

        <AppText className="flex-1 text-center font-extrabold text-white text-lg">
          View Cart
        </AppText>
        <AppText className="font-extrabold text-white text-lg">
          ${basketTotal}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
