import { ImageIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

// @ts-expect-error: No types for this image
import placeholderImage from '../../assets/images/background-image.png';

export default function HomeScreen() {
  return (
    <View className="flex h-full items-center justify-center gap-3 bg-slate-700 p-5">
      <View className="w-full flex-1 overflow-hidden">
        <Image
          source={placeholderImage}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>

      <View className="w-full gap-2">
        <Pressable
          className="flex flex-row items-center justify-center gap-3 rounded-lg bg-white p-3"
          onPress={() => alert('Photo selected!')}>
          <ImageIcon />
          <Text className="text-center font-semibold">Choose A Photo</Text>
        </Pressable>

        <Pressable
          className="flex flex-row items-center justify-center gap-3 rounded-lg bg-slate-800 p-3"
          onPress={() => alert('Photo selected!')}>
          <Text className="text-center font-semibold text-white">Use This Photo</Text>
        </Pressable>
      </View>
    </View>
  );
}
