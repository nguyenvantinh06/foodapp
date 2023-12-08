import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CategoriesDelivery from 'src/components/categories-delivery';
import {featuredDelivery} from 'src/utils/dummy-data';
import VectorIcon from 'src/components/vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppText from 'src/components/app-text';
import {COLORS, themeColors} from 'src/config/theme';
import FeatureRow from 'src/components/featured-row';
import {getFeaturedRestaurants} from 'src/apis';

export default function GroceriesScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  useEffect(() => {
    getFeaturedRestaurants().then(data => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          {/* <Icon.Search height="25" width="25" stroke="gray" /> */}
          <VectorIcon.MaterialIcons
            name="search"
            size={getSize.m(24)}
            color={COLORS.Grey}
          />
          <TextInput
            placeholder="Restaurants"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            {/* <Icon.MapPin height="20" width="20" stroke="gray" /> */}
            <VectorIcon.MaterialCommunityIcons
              name="map-marker-outline"
              size={getSize.m(20)}
              color={COLORS.Grey}
            />
            <AppText className="text-gray-600">New York, NYC</AppText>
          </View>
        </View>
        <View
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="p-3 rounded-full">
          {/* <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          /> */}
          <VectorIcon.Feather
            name="sliders"
            size={getSize.m(20)}
            color={COLORS.White}
          />
        </View>
      </View>

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        {/* categories */}
        <CategoriesDelivery />

        {/* featured */}
        <View className="mt-5">
          {featuredCategories?.map((category, index) => {
            return (
              <FeatureRow
                key={index}
                id={category?._id || category?.id}
                // title={category.name}
                // restaurants={category?.restaurants}
                // description={category.description}
                item={category}
                featuredCategory={category._type}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
