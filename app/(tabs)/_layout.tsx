import { Tabs } from 'expo-router';
import { CircleHelpIcon, HouseIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarInactiveTintColor: 'gray' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon(props) {
            return <HouseIcon size={props.size} stroke={props.color} />;
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon(props) {
            return <CircleHelpIcon size={props.size} stroke={props.color} />;
          },
        }}
      />
    </Tabs>
  );
}
