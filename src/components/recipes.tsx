import {View, Pressable} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import Loading from 'src/components/app-loading';
import AppImage from './app-image';
import AppText from './app-text';
import NavigationService from 'src/navigation/navigations-service';
import {SCENE_NAME} from 'src/utils/app-const';

export default function Recipes({categories, meals}: any) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <AppText
        style={{fontSize: hp(3)}}
        className="font-semibold text-neutral-600">
        Recipes
      </AppText>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={item => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => <RecipeCard item={item} index={i} />}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({item, index}: any) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() =>
          NavigationService.navigate(SCENE_NAME.RECIPE_DETAIL, {...item})
        }>
        <AppImage
          source={{uri: item.strMealThumb}}
          style={{
            width: '100%',
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          // sharedTransitionTag={item.strMeal}
        />

        <AppText
          style={{fontSize: hp(1.5)}}
          className="font-semibold ml-2 text-neutral-600">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </AppText>
      </Pressable>
    </Animated.View>
  );
};
