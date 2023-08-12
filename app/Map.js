import React, { memo, useState, useEffect } from "react";
import { Button, Image, Container, Text, Center } from "native-base";
import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  Heading,
  FormControl,
  Box,
  IconButton,
  HStack,
  Icon,
  VStack,
  Stack,
  ScrollView,
  Actionsheet,
} from "native-base";
import { View } from "react-native";
import MapView from "react-native-maps";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Platform } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
const Map = () => {
  const [openOverlay, setOpen] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const showOverLay = () => {
    setOpen(!openOverlay);
  };
  const time = new Date().getHours();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  console.log(location);
  const nav = useNavigation();
  return (
    <NativeBaseProvider>
      <StatusBar
        backgroundColor="white"
        style={time > 16 || time < 7 ? "light" : "dark"}
      />

      <View width={"100%"} height={"100%"}>
        <Button
          onPress={() => nav.goBack()}
          style={{
            position: "absolute",
            zIndex: 20,
            top: 80,
            left: 40,
            backgroundColor: "green",
          }}>
          Back
        </Button>
        <MapView
          showsCompass={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={{ width: "100%", height: "100%" }}
          mapType={time > 16 || time < 7 ? "hybrid" : "standard"}
          region={
            location !== null
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : {
                  latitude: 0.3476,
                  longitude: 32.5825,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
          }
          tintColor="blue"></MapView>
      </View>
      <Actionsheet
        isOpen={openOverlay}
        onClose={showOverLay}
        disableOverlay={true}
        useRNModal={true}>
        <Actionsheet.Content borderTopRadius="0">
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}>
              Track Location
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </NativeBaseProvider>
  );
};

export default memo(Map);
