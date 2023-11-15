import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import { selectResturant } from '../slices/resturantSlice';
import MapView, {Marker} from 'react-native-maps';
import {themeColors} from 'src/config/theme';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import {getSize} from 'src/hooks/use-resize-hoc';
import VectorIcon from 'src/components/vector-icons';
import {featuredDelivery} from 'src/utils/dummy-data';
import {SCENE_NAME} from 'src/utils/app-const';
import {selectRestaurant} from 'src/store/slices/restaurant-slice';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {emptyBasket} from 'src/store/slices/basket-slice';
// import { themeColors } from '../theme';
// import { emptyBasket } from '../slices/basketSlice';

export default function DeliveryScreen() {
  const navigation = useNavigation();
  // const restaurant = featuredDelivery[0].restaurants[0];
  const restaurant = useAppSelector(selectRestaurant);
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(emptyBasket({}));
    navigation.navigate(SCENE_NAME.GROCERIES_TAB);
  };
  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        className="flex-1"
        mapType="standard">
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>

      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <TouchableOpacity className="absolute right-4 top-2"></TouchableOpacity>
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <AppText className="text-lg text-gray-700 font-semibold">
              Estimated Arrival
            </AppText>
            <AppText className="text-3xl font-extrabold text-gray-700">
              20-30 Minutes
            </AppText>
            <AppText className="mt-2 text-gray-700 font-semibold">
              Your Order is own its way
            </AppText>
          </View>
          <AppImage
            className="h-24 w-24"
            source={require('src/assets/images/bikeGuy2.gif')}
          />
        </View>

        <View
          style={{backgroundColor: themeColors.bgColor(0.8)}}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
          <View
            style={{backgroundColor: 'rgba(255,255,255,0.4)'}}
            className="p-1 rounded-full">
            <AppImage
              style={{backgroundColor: 'rgba(255,255,255,0.4)'}}
              className="w-16 h-16 rounded-full"
              source={require('src/assets/images/avatar.png')}
            />
          </View>

          <View className="flex-1 ml-3">
            <AppText className="text-lg font-bold text-white">Driver</AppText>
            <AppText className="text-white font-semibold">Your Rider</AppText>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              {/* <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth="1" /> */}
              <VectorIcon.MaterialCommunityIcons
                name="phone"
                size={getSize.m(15)}
                color={themeColors.bgColor(1)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              className="bg-white p-2 rounded-full">
              <VectorIcon.MaterialCommunityIcons
                name="close"
                size={getSize.m(15)}
                color={'red'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
