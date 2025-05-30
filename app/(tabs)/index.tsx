import { CameraIcon, ImageDownIcon, ImageIcon, PlusIcon, RotateCcwIcon } from 'lucide-react-native';
import { ImageSourcePropType, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';
// @ts-expect-error: No types for this image
import placeholderImage from '../../assets/images/background-image.png';
import { useState } from 'react';
import StickerModal from 'components/StickerModal';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [openStickerModal, setOpenStickerModal] = useState(false);
  const [pickedSticker, setPickedSticker] = useState<ImageSourcePropType>();

  return (
    <View className="flex h-full items-center justify-center gap-3 bg-slate-700 p-5">
      <View className="relative w-full flex-1 overflow-hidden">
        <Image
          source={selectedImage ?? placeholderImage}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
        {pickedSticker && (
          <Image source={pickedSticker} style={{ width: 100, height: 100, position: 'absolute' }} />
        )}
      </View>

      {showEditMenu ? (
        <View className="flex w-full flex-row items-center justify-evenly">
          <View>
            <Pressable
              onPress={() => setShowEditMenu(false)}
              className="flex flex-col items-center bg-transparent transition-transform active:scale-95">
              <RotateCcwIcon color={'white'} />
              <Text className="font-semibold text-white">Reset</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              className="flex aspect-square items-center justify-center rounded-full border-2 border-yellow-400 p-2 transition-transform active:scale-95"
              onPress={() => setOpenStickerModal(true)}>
              <View className="rounded-full bg-white p-2">
                <PlusIcon size={48} />
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable className="flex flex-col items-center gap-1 bg-transparent transition-transform active:scale-95">
              <ImageDownIcon color={'white'} />
              <Text className="font-semibold text-white">Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="flex w-full gap-2">
          <View className="flex flex-row gap-2">
            <Pressable
              className="flex flex-grow flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 transition-transform active:scale-95"
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
              className="flex flex-grow flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 transition-transform active:scale-95"
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

          <Pressable
            className="w-full rounded-lg bg-slate-800 p-3 transition-transform active:scale-95 active:bg-slate-900"
            onPress={() => setShowEditMenu(true)}>
            <Text className="text-center font-semibold text-white">Use This Photo</Text>
          </Pressable>
        </View>
      )}

      <StickerModal
        visible={openStickerModal}
        setVisible={setOpenStickerModal}
        setSelectedSticker={setPickedSticker}
      />
    </View>
  );
}
