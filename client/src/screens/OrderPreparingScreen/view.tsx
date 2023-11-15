import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import AppImage from 'src/components/app-image';
import {SCENE_NAME} from 'src/utils/app-const';
export default function OrderPreparingScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(SCENE_NAME.DELIVER_SCREEN);
    }, 3000);
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <AppImage
        source={require('src/assets/images/delivery.gif')}
        className="h-80 w-80"
      />
    </View>
  );
}
