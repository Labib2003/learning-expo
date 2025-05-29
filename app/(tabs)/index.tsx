import { CameraIcon, ImageIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
// @ts-expect-error: No types for this image
import placeholderImage from '../../assets/images/background-image.png';
import { useState } from 'react';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string>();

  return (
    <View className="flex h-full items-center justify-center gap-3 bg-slate-700 p-5">
      <View className="w-full flex-1 overflow-hidden">
        <Image
          source={selectedImage ?? placeholderImage}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>

      <View className="w-full gap-2">
        <View className="flex flex-row gap-2">
          <Pressable
            className="flex flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 transition-all active:scale-95"
            onPress={async () => {
              const result = await launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
              });
              if (result.assets) setSelectedImage(result.assets[0].uri);
            }}>
            <CameraIcon />
            <Text className="text-center font-semibold">Take A Photo</Text>
          </Pressable>

          <Pressable
            className="flex flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 transition-all active:scale-95"
            onPress={async () => {
              const result = await launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
              });
              if (result.assets) setSelectedImage(result.assets[0].uri);
            }}>
            <ImageIcon />
            <Text className="text-center font-semibold">Choose A Photo</Text>
          </Pressable>
        </View>

        <Pressable className="w-full rounded-lg bg-slate-800 p-3 transition-all active:scale-95 active:bg-slate-900">
          <Text className="text-center font-semibold text-white">Use This Photo</Text>
        </Pressable>
      </View>
    </View>
  );
}
