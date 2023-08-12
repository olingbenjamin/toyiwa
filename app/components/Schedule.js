import React, { useState, useCallback, memo, useEffect } from "react";
import { StatusBar, Button, FormControl, Input, ScrollView } from "native-base";
import { Icon, Pressable, Toast, Flex, Spinner, Checkbox } from "native-base";
import { NativeBaseProvider, Heading, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import getApi from "../getApi";
const apiKey = getApi();
const now = new Date();
const Schedule = ({ back }) => {
  const user = useSelector((state) => state.login.user);
  const [detials, setDetails] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(now);
  const [time, setTime] = useState(now);
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState({});
  const [pickerOpen, setOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [exactTime, setExactTime] = useState("");
  const changeDate = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setOpen(false);
  });
  const changeTime = useCallback((event, selectedTime) => {
    setTime(selectedTime);
    setExactTime(selectedTime.toTimeString());
    setTimeOpen(false);
  });
  const nav = useNavigation();
  handleSchedule = async () => {
    const schedule = {
      user_id: user._id,
      categories: categories,
      schedule_date: date,
      pickup_time: time,
      location: location,
      quantity: quantity,
    };
    await axios
      .post(`${apiKey}/schedule`, schedule)
      .then((response) => {
        if (response.data.success === true)
          showToast(response.data.message, "green.700");
        else showToast(response.data.message, "red.700");
      })
      .catch((err) => {
        showToast(err.message, "red.700");
      });
  };

  const showToast = (msg, color) => {
    Toast.show({
      title: msg,
      placement: "top",
      backgroundColor: `${color}`,
    });
  };
  useEffect(() => {
    setTimeout(() => setShowForm(true), 1000);
  }, []);

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
        width={"100%"}>
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
          onPress={back}>
          <Icon
            as={Ionicons}
            name="chevron-back-outline"
            size={30}
            color="green.700"
          />
        </Pressable>

        <Heading alignSelf="center" color="green.700">
          Schedule Waste Pick-Up
        </Heading>
      </HStack>
      <ScrollView>
        {pickerOpen && (
          <DateTimePicker
            value={date}
            onChange={changeDate}
            mode="date"
            textColor="#ff5349"
            positiveButton={{ label: "SET", textColor: "#ff5349" }}
          />
        )}
        {timeOpen && (
          <DateTimePicker
            value={time}
            onChange={changeTime}
            mode="time"
            textColor="#ff5349"
            positiveButton={{ label: "SET", textColor: "#ff5349" }}
          />
        )}
        {showForm ? (
          <FormControl>
            <FormControl.Label m={2}>Waste Category</FormControl.Label>
            <FormControl.HelperText m={2}>
              Select all that apply
            </FormControl.HelperText>
            <Checkbox.Group
              colorScheme="green"
              defaultValue={categories}
              onChange={(values) => {
                setCategories(values);
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
              Set pick-up date and time
            </FormControl.Label>

            <HStack width={"100%"}>
              <Input
                value={date.toDateString()}
                isReadOnly={true}
                width={"55%"}
                m={2}
                placeholder="DD-MM-YYYY"
                borderColor={"green.700"}
                borderWidth={2}
                InputLeftElement={
                  <Icon
                    mb="1"
                    as={<Ionicons name={"calendar"} />}
                    color="green.700"
                    size={"md"}
                    m={2}
                  />
                }
                InputRightElement={
                  <Pressable
                    onPress={() => setOpen(!pickerOpen)}
                    width={"1/6"}
                    //backgroundColor={"gray.200"}
                    height={"100%"}
                    _pressed={{ backgroundColor: "amber.400" }}
                    justifyItems={"center"}>
                    <Icon
                      as={<Ionicons name={"caret-down"} />}
                      color="green.700"
                      size={"sm"}
                      alignSelf={"center"}
                      m={"0.5"}
                    />
                  </Pressable>
                }
              />
              <Input
                isReadOnly={true}
                value={exactTime.substring(0, 5)}
                keyboardType="numeric"
                width={"35%"}
                m={2}
                placeholder="16:00 AM"
                borderColor={"green.700"}
                borderWidth={2}
                InputLeftElement={
                  <Icon
                    m={1}
                    as={<Ionicons name={"time"} />}
                    color="green.700"
                    size={"md"}
                  />
                }
                InputRightElement={
                  <Pressable
                    onPress={() => setTimeOpen(!timeOpen)}
                    width={"1/6"}
                    //backgroundColor={"gray.200"}
                    height={"100%"}
                    _pressed={{ backgroundColor: "amber.400" }}
                    justifyItems={"center"}>
                    <Icon
                      mb="1"
                      as={<Ionicons name={"caret-down"} />}
                      color="green.700"
                      size={"sm"}
                      m={1}
                    />
                  </Pressable>
                }
              />
            </HStack>
            <Input
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              keyboardType="number-pad"
              width={"95%"}
              m={2}
              placeholder="Quantity"
              borderColor={"green.700"}
              borderWidth={2}
              InputLeftElement={
                <Icon
                  mb="1"
                  as={<Ionicons name={"calendar"} />}
                  color="green.700"
                  size={"md"}
                  m={2}
                />
              }></Input>
            <FormControl.Label m={2}>
              Where are we picking the waste
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
              onPress={() => nav.navigate("Map")}
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
                color="green.700"
                size={25}
              />
            </Pressable>
            <Button
              m={5}
              height={50}
              backgroundColor={"green.700"}
              _pressed={{ backgroundColor: "gold" }}
              onPress={handleSchedule}>
              <Text fontSize={"18"} color="white" fontWeight={"800"}>
                Submit
              </Text>
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

export default memo(Schedule);
