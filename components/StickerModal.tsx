import { XIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction, useState } from 'react';
import { FlatList, ImageSourcePropType, Modal, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

// @ts-expect-error images don't have types
import sticker1 from '../assets/images/emoji1.png';
// @ts-expect-error images don't have types
import sticker2 from '../assets/images/emoji2.png';
// @ts-expect-error images don't have types
import sticker3 from '../assets/images/emoji3.png';
// @ts-expect-error images don't have types
import sticker4 from '../assets/images/emoji4.png';
// @ts-expect-error images don't have types
import sticker5 from '../assets/images/emoji5.png';
// @ts-expect-error images don't have types
import sticker6 from '../assets/images/emoji6.png';

export default function StickerModal({
  visible,
  setVisible,
  setSelectedSticker,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedSticker: Dispatch<SetStateAction<ImageSourcePropType | undefined>>;
}) {
  const [stickers] = useState<ImageSourcePropType[]>([
    sticker1,
    sticker2,
    sticker3,
    sticker4,
    sticker5,
    sticker6,
  ]);

  return (
    <View>
      <Modal animationType="slide" transparent visible={visible}>
        <View className="absolute bottom-0 left-0 right-0 h-1/4 rounded-t-lg bg-slate-800 p-3">
          <View className="flex flex-row items-center justify-between pb-5">
            <Text className="font-semibold text-white">Select Sticker</Text>

            <Pressable onPress={() => setVisible(false)}>
              <XIcon stroke={'white'} />
            </Pressable>
          </View>

          <View>
            <FlatList
              horizontal
              data={stickers}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  className="transition-transform active:scale-95"
                  onPress={() => setSelectedSticker(item)}>
                  <Image source={item} style={{ height: 100, width: 100 }} />
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
