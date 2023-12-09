import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import AppImage from './app-image';
import AppText from './app-text';

interface ICategories {
  categories: any[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}
export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}: ICategories) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}>
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonClass = isActive ? ' bg-amber-400' : ' bg-black/10';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center space-y-1">
              <View className={'rounded-full p-[6px] ' + activeButtonClass}>
                {/* <Image
                                source={{uri: cat.strCategoryThumb}}
                                style={{width: hp(6), height: hp(6)}}
                                className="rounded-full"
                            /> */}
                <AppImage
                  source={{uri: cat.strCategoryThumb}}
                  style={{width: hp(6), height: hp(6)}}
                  className="rounded-full"
                />
              </View>
              <AppText className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                {cat.strCategory}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
