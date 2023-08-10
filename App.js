import React from "react";
import GetStarted from "./app/GetStarted";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Register from "./app/Register";
import Login from "./app/Login";
import Home from "./app/Home";
import Map from "./app/Map";
import Profile from "./app/Profile";
import PickUp from "./app/components/PickUp";
import Requests from "./app/Requests";
import Schedule from "./app/components/Schedule";
import EditProfile from "./app/components/EditProfile";
import Payment from "./app/components/Payment";
import { useSelector } from "react-redux";

export default function App() {
  const loggedIn = useSelector((state) => state.login.loggedIn);

  //Screens
  const GetStartedScreen = ({ navigation }) => {
    return <GetStarted />;
  };

  const RegisterScreen = () => {
    return <Register />;
  };
  const LoginScreen = () => {
    return <Login />;
  };
  const HomeScreen = () => {
    return <Home />;
  };
  const MapScreen = () => {
    return <Map />;
  };
  const ProfileScreen = () => {
    return <Profile />;
  };
  const PickUpScreen = () => {
    const nav = useNavigation();
    return <PickUp back={() => nav.goBack()} />;
  };
  const RequestsScreen = () => {
    const nav = useNavigation();
    return <Requests back={() => nav.goBack()} />;
  };
  const ScheduleScreen = () => {
    const nav = useNavigation();
    return <Schedule back={() => nav.goBack()} />;
  };
  const PaymentScreen = () => {
    const nav = useNavigation();
    return <Payment back={() => nav.goBack()} />;
  };

  const EditProfileScreen = () => {
    return <EditProfile />;
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Get Started"
          component={loggedIn ? HomeScreen : GetStartedScreen}
          options={options}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={options}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={options} />
        <Stack.Screen name="Map" component={MapScreen} options={options} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={options}
        />
        {/* other Screens */}
        <Stack.Screen
          name="Pick up"
          component={PickUpScreen}
          options={options}
        />

        <Stack.Screen
          name="Requests"
          component={RequestsScreen}
          options={options}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={options}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={options}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfileScreen}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const options = {
  headerShown: false,
  // gestureEnabled: true,
  // gestureDirection: "horizontal",
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
