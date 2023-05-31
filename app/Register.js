import React, { useState, useCallback, memo } from "react";
import { StatusBar, Button, Image, Container, Text, Center } from "native-base";
import {
  NativeBaseProvider,
  Heading,
  FormControl,
  Box,
  Input,
  VStack,
  HStack,
  Icon,
  Avatar,
  ScrollView,
  Pressable,
  Actionsheet,
} from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
function Register() {
  const [isSelect, setIsSelect] = useState(false);
  //vlues
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [conirm, setConfirm] = useState("");

  const showSelectImage = useCallback(() => {
    setIsSelect(!isSelect);
  });
  const handleFormChange = useCallback((setState, value) => {
    setState(value);
  });
  const handleSubmit = () => {
    const user = {
      firstname: fname,
      last_name: lname,
      email: email,
      phone_number: phoneNumber,
      password: password,
    };
    console.log(user);
  };

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={"light-content"} backgroundColor={"green"} />
      <ScrollView>
        <FormControl width={"100%"} alignSelf={"center"}>
          <Pressable onPress={showSelectImage}>
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="2xl"
              source={{
                uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
              }}
              m={2}
            >
              RB
            </Avatar>
          </Pressable>
          <HStack width={"90%"}>
            <Box width={"50%"} m={2}>
              <FormControl.Label m={2}>First Name</FormControl.Label>
              <Input
                value={fname}
                onChangeText={(value) => handleFormChange(setFname, value)}
                width={"100%"}
                placeholder="First name"
                fontSize={"14"}
                borderColor="green.700"
              />
            </Box>
            <Box width={"50%"} m={2}>
              <FormControl.Label m={2}>Last Name</FormControl.Label>
              <Input
                value={lname}
                onChangeText={(value) => handleFormChange(setLname, value)}
                width={"100%"}
                placeholder="Last name"
                fontSize={"14"}
                borderColor="green.700"
              />
            </Box>
          </HStack>
          <VStack m={2}>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input
              value={email}
              onChangeText={(value) => handleFormChange(setEmail, value)}
              fontSize={"14"}
              placeholder="Email Address"
              borderColor={"green.700"}
              InputLeftElement={
                <Icon
                  m={2}
                  as={MaterialIcons}
                  name="email"
                  color="green.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
            />
          </VStack>
          <VStack m={2}>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input
              value={phoneNumber}
              onChangeText={(value) => handleFormChange(setPhone, value)}
              fontSize={"14"}
              placeholder="Phone Number"
              borderColor={"green.700"}
              InputLeftElement={
                <Icon
                  m={2}
                  as={MaterialIcons}
                  name="phone"
                  color="green.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
            />
          </VStack>
          <VStack m={2}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={(value) => handleFormChange(setPassword, value)}
              type="password"
              placeholder="Set new Password"
              fontSize={"14"}
              borderColor={"green.700"}
              InputLeftElement={
                <Icon
                  m={2}
                  as={Ionicons}
                  name="finger-print-sharp"
                  color="green.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
              InputRightElement={
                <Icon
                  m={2}
                  as={Ionicons}
                  name="ios-eye"
                  color="green.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
            />
          </VStack>
          <VStack m={2}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              value={conirm}
              onChangeText={(value) => handleFormChange(setConfirm, value)}
              type="password"
              placeholder="Confirm Password"
              fontSize={"14"}
              borderColor={"green.700"}
              InputLeftElement={
                <Icon
                  m={2}
                  as={Ionicons}
                  name="finger-print-sharp"
                  color="green.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
              InputRightElement={
                <Icon
                  m={2}
                  as={Ionicons}
                  name="ios-eye"
                  color="green.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
            />
          </VStack>
          <Button m={5} bg="green.700" onPress={handleSubmit}>
            <Heading color="white">Sign Up</Heading>
          </Button>
        </FormControl>
      </ScrollView>
      <Actionsheet isOpen={isSelect} onClose={showSelectImage}>
        <Actionsheet.Content>
          <Heading>Select profile image</Heading>

          <Actionsheet.Item
            startIcon={
              <Icon m={2} as={Ionicons} name="ios-camera" size={"lg"} />
            }
          >
            Take Photo
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon m={2} as={Ionicons} name="ios-image-outline" size={"lg"} />
            }
          >
            Choose from gallery
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={showSelectImage}
            startIcon={<Icon m={2} as={Ionicons} name="close" size={"lg"} />}
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </NativeBaseProvider>
  );
}
export default memo(Register);
