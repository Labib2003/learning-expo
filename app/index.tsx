import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex h-full flex-row items-center">
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <View key={idx} className="flex-grow border">
            <Text className="text-center text-3xl font-bold">Home</Text>
          </View>
        ))}
    </View>
  );
}
