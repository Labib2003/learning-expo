import { XIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export default function StickerModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View>
      <Modal animationType="slide" transparent visible={visible}>
        <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-slate-800 p-3">
          <View className="flex flex-row items-center justify-between pb-3">
            <Text className="font-semibold text-white">Select Sticker</Text>

            <Pressable onPress={() => setVisible(false)}>
              <XIcon stroke={'white'} />
            </Pressable>
          </View>

          <View>
            <Text>Body</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
