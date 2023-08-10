import React, { useState, useCallback, memo, useEffect } from "react";
import { StatusBar, Button, FormControl } from "native-base";
import { Spinner, Input, ScrollView } from "native-base";
import { Icon, Pressable, Toast, Flex, Checkbox } from "native-base";
import { NativeBaseProvider, Heading, VStack, HStack, Text } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import getApi from "../getApi";
import ThisLocation from "./Location";
import { useNavigation } from "@react-navigation/native";
const apiKey = getApi();

const PickUp = () => {
  //const location = ThisLocation();
  const user = useSelector((state) => state.login.user);
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    user_id: user._id,
    location: {},
    categories: [],
    renderForm: false,
  });

  const submitRequest = useCallback(() => {
    if (fields.categories.length <= 0) {
      showToast("Please select the categories of waste!", "red.500");
      return;
    } else if (fields.quantity == null) {
      showToast("Provide the quantity of the waste!", "red.500");
      return;
    } else if (!fields.location) {
      showToast("You must provide the location!", "red.500");
      return;
    } else {
      setSubmitting(true);
      axios
        .post(`${apiKey}/pickuprequest`, fields)
        .then((response) => {
          if (response.data.success === false) {
            showToast(response.data.message, "red.700");
          } else {
            showToast(response.data.message, "green.700");
          }
          setSubmitting(false);
        })
        .catch((err) => {
          showToast(err.message, "red.700");
          setSubmitting(false);
        });
    }
  });
  const showToast = (msg, color) => {
    Toast.show({
      title: msg,
      placement: "top",
      backgroundColor: `${color}`,
      accessibilityAnnouncement: "Error",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setFields({ ...fields, showForm: true });
    }, 100);
  }, []);
  //console.log(location);
  const nav = useNavigation();
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={"green"} barStyle={"light-content"} />
      <HStack
        height={"15%"}
        size="16"
        backgroundColor="white"
        rounded="sm"
        shadow={"3"}
        shad
        width={"100%"}
        mb={"5"}>
        <Pressable
          width={50}
          height={50}
          m={2}
          p="2"
          bg="white"
          _text={{
            fontSize: "md",
            fontWeight: "medium",
            color: "warmGray.50",
            letterSpacing: "lg",
          }}
          shadow={2}
          rounded={"full"}
          justifyContent={"space-evenly"}
          _pressed={{ backgroundColor: "gold" }}
          onPress={() => nav.goBack()}>
          <Icon
            as={Ionicons}
            name="chevron-back-outline"
            size={30}
            color="green.700"
          />
        </Pressable>

        <Heading alignSelf="center" color="green.700">
          Waste Pick-up Request
        </Heading>
      </HStack>
      <ScrollView>
        {fields.showForm ? (
          <FormControl m={2} alignSelf={"center"}>
            <FormControl.Label m={2}>
              What Category are we picking?
            </FormControl.Label>
            <FormControl.HelperText m={2}>
              (Select all that apply)
            </FormControl.HelperText>

            <Checkbox.Group
              colorScheme="green"
              defaultValue={fields.categories}
              onChange={(values) => {
                setFields({ ...fields, categories: [values] });
              }}>
              <Flex flexWrap={"wrap"} flexDirection={"row"} m={2}>
                <Checkbox value="Yard waste" my="1">
                  Yard waste
                </Checkbox>
                <Checkbox value="Metal" my="1">
                  Metal
                </Checkbox>
                <Checkbox value="Hazardous" my="1">
                  Hazardous
                </Checkbox>
                <Checkbox value="Plastic" my="1">
                  Plastic
                </Checkbox>
                <Checkbox value="Food waste" my="1">
                  Food waste
                </Checkbox>
                <Checkbox value="Glass" my="1">
                  Glass
                </Checkbox>
                <Checkbox value="Paper" my="1">
                  Paper
                </Checkbox>
                <Checkbox value=" Polythen Bags" my="1">
                  Polythen Bags
                </Checkbox>
              </Flex>
            </Checkbox.Group>

            <FormControl.Label m={2}>
              What is the Quanity in Kilogram?
            </FormControl.Label>

            <Input
              m={2}
              borderColor={"green.700"}
              borderWidth={2}
              keyboardType="numeric"
              value={fields.quantity && fields.quantity}
              onChangeText={(value) =>
                setFields({ ...fields, quantity: value })
              }
              placeholder="Enter Quantity"
              fontSize={"16"}
              backgroundColor={"white"}
              InputRightElement={
                <Icon
                  as={<MaterialCommunityIcons name="weight-kilogram" />}
                  size={25}
                  m={2}
                />
              }
            />
            <FormControl.Label m={2}>
              Where are we picking the waste?
            </FormControl.Label>
            <Pressable
              mb={"1.5"}
              alignSelf={"center"}
              size="16"
              rounded="sm"
              bg={"white"}
              width={"96%"}
              height={50}
              alignItems={"center"}
              padding={1}
              _pressed={{
                backgroundColor: "gray.200",
              }}
              flexDirection={"row"}
              justifyContent={"space-between"}
              borderColor={"green.700"}
              borderWidth={2}>
              <Text fontSize={"18"} color="gray.500" fontWeight={"800"}>
                Location
              </Text>
              <Icon
                mb="1"
                as={<Ionicons name={"location"} />}
                color="gray.500"
                size={25}
              />
            </Pressable>
            <Button
              m={5}
              height={50}
              _pressed={{ backgroundColor: "gold" }}
              backgroundColor="green.700"
              onPress={submitRequest}
              isLoading={submitting}
              isDisabled={submitting}
              isLoadingText="Submitting"
              _loading={{ backgroundColor: "#000000c0", color: "black" }}>
              <Heading color={"white"}>Next</Heading>
            </Button>
          </FormControl>
        ) : (
          <HStack space={2} justifyContent="center" mt="1/2">
            <Spinner color="green.700" size={"lg"} />
            <Heading color="green.700" fontSize="md">
              Just a moment...
            </Heading>
          </HStack>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default memo(PickUp);
