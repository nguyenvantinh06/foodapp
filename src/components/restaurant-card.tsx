import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
// import {urlFor} from '../sanity';
import {useNavigation} from '@react-navigation/native';
import {SCENE_NAME} from 'src/utils/app-const';
import AppImage from './app-image';
import AppText from './app-text';
import {COLORS, themeColors} from 'src/config/theme';
import VectorIcon from './vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';

export default function RestaurantCard({id, restaurant}: any) {
  // console.log(urlFor(imgUrl).url());
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(SCENE_NAME.RESTAURANT_SCREEN, {
          item: restaurant,
        });
      }}>
      <View
        style={{shadowColor: themeColors.bgColor(0.2), shadowRadius: 7}}
        className="mr-6 bg-white rounded-3xl shadow-lg">
        <AppImage
          className="h-36 w-64 rounded-t-3xl"
          //   source={{uri: urlFor(imgUrl).url()}}
          source={restaurant?.image}
        />

        <View className="px-3 pb-4 space-y-2">
          <AppText className="text-lg font-bold pt-2">
            {restaurant?.title}
          </AppText>
          <View className="flex-row items-center space-x-1">
            <AppImage
              source={require('src/assets/images/fullStar.png')}
              className="h-4 w-4"
            />
            <AppText className="text-xs">
              <AppText className="text-green-700">{restaurant?.rating}</AppText>
              <AppText className="text-gray-700">
                {' '}
                ({restaurant?.reviews} review)
              </AppText>{' '}
              ·{' '}
              <AppText className="font-semibold text-gray-700">
                {restaurant?.type}
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
            <AppText className="text-gray-700 text-xs">
              {' '}
              Nearby · {restaurant?.address}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
