import { Dispatch, SetStateAction } from 'react';
import { Alert, ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function Sticker({
  source,
  size: initialSize = 100,
  idx,
  setPickedStickers,
}: {
  source: ImageSourcePropType;
  size?: number;
  idx: number;
  setPickedStickers: Dispatch<SetStateAction<ImageSourcePropType[]>>;
}) {
  const stickerSize = useSharedValue(initialSize);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const handleDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (stickerSize.value === initialSize) stickerSize.value = stickerSize.value * 2;
      else stickerSize.value = initialSize;
    });
  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(stickerSize.value),
    height: withSpring(stickerSize.value),
  }));

  const handleTripleTap = Gesture.Tap()
    .numberOfTaps(3)
    .onEnd(() => {
      Alert.alert('Are your sure?', 'Are you sure you want to remove this sticker?', [
        {
          text: 'Yes',
          onPress: () => setPickedStickers((ps) => ps.filter((_, i) => i !== idx)),
        },
        {
          text: 'No',
        },
      ]);
    })
    .runOnJS(true);

  const handlePan = Gesture.Pan().onChange((e) => {
    positionX.value += e.changeX;
    positionY.value += e.changeY;
  });
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
  }));

  return (
    <GestureDetector gesture={handlePan}>
      <Animated.View className="absolute" style={[containerStyle]}>
        <GestureDetector gesture={Gesture.Exclusive(handleTripleTap, handleDoubleTap)}>
          <Animated.Image
            source={source}
            resizeMode="contain"
            style={[imageStyle, { width: initialSize, height: initialSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
