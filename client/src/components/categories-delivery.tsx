import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {categoriesDelivery} from 'src/utils/dummy-data';
import {urlFor} from 'src/services/santity';
import AppImage from './app-image';
import {getCategories} from 'src/apis';
import {CategoryDeliveryDto} from 'src/utils/data-dto';

export default function CategoriesDelivery() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState<CategoryDeliveryDto[]>([]);
  useEffect(() => {
    getCategories().then(data => {
      console.log('got data', data);
      setCategories(data);
    });
  }, []);

  return (
    <View className="mt-4">
      <ScrollView
        // className="p-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        {categories?.map(category => {
          let isActive = category._id == activeCategory;
          let btnClass = isActive ? ' bg-gray-600' : ' bg-gray-200';
          let textClass = isActive
            ? ' font-semibold text-gray-800'
            : ' text-gray-500';
          return (
            <View
              key={category._id || category.id}
              className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => setActiveCategory(category._id)}
                className={'p-1 rounded-full shadow' + btnClass}>
                <AppImage
                  style={{width: 45, height: 45, borderRadius: 45 / 2}}
                  source={{
                    uri: urlFor(category.image?.asset).url(),
                  }}
                  // source={category.image}
                />
              </TouchableOpacity>
              <Text className={'text-sm ' + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
