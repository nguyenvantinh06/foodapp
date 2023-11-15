import {View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, {FadeInDown, FadeIn} from 'react-native-reanimated';
import {Platform} from 'react-native';
import AppLoading from 'src/components/app-loading';
import AppImage from 'src/components/app-image';
import AppText from 'src/components/app-text';
import VectorIcon from 'src/components/vector-icons';
import {getYoutubeVideoId, handleOpenLink} from 'src/utils/app-utils';

const ios = Platform.OS == 'ios';

export default function RecipeDetailScreen({
  meal,
  loading,
  isFavorite,
  setIsFavorite,
  item,
}: any) {
  const navigation = useNavigation();

  const ingredientsIndexes = (meal: any) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* recipe image */}
        <View className="flex-row justify-center">
          <AppImage
            source={{uri: item.strMealThumb}}
            style={{
              width: wp(100),
              height: hp(50),
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
            // sharedTransitionTag={item.strMeal}
          />
        </View>

        {/* back button */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="w-full absolute flex-row justify-between items-center pt-14">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-5 bg-white">
            <VectorIcon.MaterialCommunityIcons
              name="chevron-left"
              size={hp(3.5)}
              color="#fbbf24"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full mr-5 bg-white">
            <VectorIcon.MaterialCommunityIcons
              name="heart"
              size={hp(3.5)}
              color={isFavorite ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* meal description */}
        {loading ? (
          <AppLoading />
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* name and area */}
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              className="space-y-2">
              <AppText
                style={{fontSize: hp(3)}}
                className="font-bold flex-1 text-neutral-700">
                {meal?.strMeal}
              </AppText>
              <AppText
                style={{fontSize: hp(2)}}
                className="font-medium flex-1 text-neutral-500">
                {meal?.strArea}
              </AppText>
            </Animated.View>

            {/* misc */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around">
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center">
                  <VectorIcon.MaterialCommunityIcons
                    name="clock"
                    size={hp(4)}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <AppText
                    style={{fontSize: hp(2)}}
                    className="font-bold text-neutral-700">
                    35
                  </AppText>
                  <AppText
                    style={{fontSize: hp(1.3)}}
                    className="font-bold text-neutral-700">
                    Mins
                  </AppText>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center">
                  <VectorIcon.FontAwesome5
                    name="user"
                    size={hp(4)}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <AppText
                    style={{fontSize: hp(2)}}
                    className="font-bold text-neutral-700">
                    03
                  </AppText>
                  <AppText
                    style={{fontSize: hp(1.3)}}
                    className="font-bold text-neutral-700">
                    Servings
                  </AppText>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center">
                  <VectorIcon.MaterialCommunityIcons
                    name="fire"
                    size={hp(4)}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <AppText
                    style={{fontSize: hp(2)}}
                    className="font-bold text-neutral-700">
                    103
                  </AppText>
                  <AppText
                    style={{fontSize: hp(1.3)}}
                    className="font-bold text-neutral-700">
                    Cal
                  </AppText>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center">
                  <VectorIcon.FontAwesome
                    name="square"
                    size={hp(4)}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <AppText
                    style={{fontSize: hp(2)}}
                    className="font-bold text-neutral-700"></AppText>
                  <AppText
                    style={{fontSize: hp(1.3)}}
                    className="font-bold text-neutral-700">
                    Easy
                  </AppText>
                </View>
              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4">
              <AppText
                style={{fontSize: hp(2.5)}}
                className="font-bold flex-1 text-neutral-700">
                Ingredients
              </AppText>
              <View className="space-y-2 ml-3">
                {ingredientsIndexes(meal).map(i => {
                  return (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{height: hp(1.5), width: hp(1.5)}}
                        className="bg-amber-300 rounded-full"
                      />
                      <View className="flex-row space-x-2">
                        <AppText
                          style={{fontSize: hp(1.7)}}
                          className="font-extrabold text-neutral-700">
                          {meal['strMeasure' + i]}
                        </AppText>
                        <AppText
                          style={{fontSize: hp(1.7)}}
                          className="font-medium text-neutral-600">
                          {meal['strIngredient' + i]}
                        </AppText>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Animated.View>
            {/* instructions */}
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4">
              <AppText
                style={{fontSize: hp(2.5)}}
                className="font-bold flex-1 text-neutral-700">
                Instructions
              </AppText>
              <AppText style={{fontSize: hp(1.6)}} className="text-neutral-700">
                {meal?.strInstructions}
              </AppText>
            </Animated.View>

            {/* recipe video */}

            {meal.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4">
                <AppText
                  style={{fontSize: hp(2.5)}}
                  className="font-bold flex-1 text-neutral-700">
                  Recipe Video
                </AppText>
                <View>
                  {/* YoutubeIfram uses webview and it does not work properly on android (until its fixed we'll just show the video on ios) */}
                  {ios ? (
                    <YouTubeIframe
                      webViewProps={{
                        overScrollMode: 'never', // a fix for webview on android - which didn't work :(
                      }}
                      videoId={getYoutubeVideoId(meal.strYoutube)}
                      height={hp(30)}
                    />
                  ) : (
                    <TouchableOpacity
                      className="mb-5"
                      onPress={() => handleOpenLink(meal.strYoutube)}>
                      <AppText
                        className="text-blue-600"
                        style={{fontSize: hp(2)}}>
                        {meal.strYoutube}
                      </AppText>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
