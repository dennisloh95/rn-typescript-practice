import Home from "@/pages/Home";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: "#f86442",
        },
        tabBarItemStyle: {
          width: 80,
        },
        tabBarActiveTintColor: "#f86442",
        tabBarInactiveTintColor: "#333",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "推荐",
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
