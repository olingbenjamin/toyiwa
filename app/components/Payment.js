import React, { useState, useCallback, memo, useEffect } from "react";
import { StatusBar, Button, FormControl, Input, ScrollView } from "native-base";
import { Icon, Pressable, Toast, Flex, Spinner, Checkbox } from "native-base";
import { NativeBaseProvider, Heading, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import getApi from "../getApi";
const apiKey = getApi();
const now = new Date();
const Payment = ({ back }) => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(now);
  const [time, setTime] = useState(now);
  const [quantity, setQuantity] = useState("");

  const [pickerOpen, setOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [exactTime, setExactTime] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSchedule = () => {
    // Implement your payment logic here
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
          Payment information
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
            <FormControl.Label m={2}>Add your card</FormControl.Label>
            <View style={styles.container}>
              {/* <Text style={styles.header}>Payment Details</Text> */}
              <Input
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <Input
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <Input
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
              <Input
                style={styles.input}
                placeholder="Expiration Date (MM/YY)"
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
              <Input
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                secureTextEntry
              />
              {/* <Button title="Pay" onPress={handlePayment} /> */}
            </View>
            {/* <FormControl.Label m={2}>
              Set pick-up date and time
            </FormControl.Label> */}
            {/* 
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
              }></Input> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    borderColor: "green",
    borderWidth: 2,
  },
});

export default memo(Payment);
