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
            className="flex-grow"
            onPress={async () => {
              const result = await launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
              });
              if (result.assets) setSelectedImage(result.assets[0].uri);
            }}>
            {({ pressed }) => (
              <View
                className={
                  'flex flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 transition-all ' +
                  (pressed ? 'scale-95' : 'scale-100')
                }>
                <CameraIcon />
                <Text className="text-center font-semibold">Take A Photo</Text>
              </View>
            )}
          </Pressable>

          <Pressable
            className="w-1/2"
            onPress={async () => {
              const result = await launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
              });
              if (result.assets) setSelectedImage(result.assets[0].uri);
            }}>
            {({ pressed }) => (
              <View
                className={
                  'flex flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 transition-all ' +
                  (pressed ? 'scale-95' : 'scale-100')
                }>
                <ImageIcon />
                <Text className="text-center font-semibold">Choose A Photo</Text>
              </View>
            )}
          </Pressable>
        </View>

        <Pressable onPress={() => alert('Photo selected!')}>
          {({ pressed }) => (
            <View
              className={
                'w-full rounded-lg p-3 transition-all ' +
                (pressed ? 'scale-95 bg-slate-900' : 'scale-100 bg-slate-800')
              }>
              <Text className="text-center font-semibold text-white">Use This Photo</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
