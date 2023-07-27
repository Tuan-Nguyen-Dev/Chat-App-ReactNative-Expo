import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Alert } from "react-native";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       if (token) {
  //         navigation.navigate("Home")
  //       } else {

  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   checkLoginStatus();
  // }, [])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,

    }
    axios.post("http://192.168.1.5:8000/login", user).then((response) => {
      console.log("Check response", response)
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Home")


    }).catch((error) => {
      Alert.alert("Login Error", "Invalid email or password")
      console.log("Login Error", error);
    })
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4A55A2", fontSize: 16, fontWeight: "600" }}>
            Login
          </Text>

          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 15 }}>
            Sign In To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 15,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="enter your email"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 15,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="password"
            />
          </View>


          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 8,
            }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: 'center' }}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}>
            <Text style={{ textAlign: 'center', color: "gray", fontSize: 16 }}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
