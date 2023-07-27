import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import axios from 'axios'
import { Alert } from 'react-native'

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const navigation = useNavigation()

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image,
        }
        // gửi a Post yêu cầu cho backend để đăng ký user
        axios.post("http://192.168.1.5:8000/register", user).then((response) => {
            console.log(response);
            Alert.alert(
                "Register Success",
                "You have been registed Succesfully",
                // [
                //     { text: "OK", onPress: () => navigation.navigate("Login") },
                // ],
            );
            setName("");
            setEmail("");
            setPassword("");
            setImage("");
        }).catch((err) => {
            Alert.alert(
                "Register Failed >>>>>>",
                "An error occurred while resgitering",
                // [
            )
            console.log("Register failed", err);
        })
    }
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "white",
        }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <KeyboardAvoidingView>
                    <View
                        style={{
                            marginTop: 100,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#4A55A2", fontSize: 16, fontWeight: "600" }}>
                            Register
                        </Text>

                        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 15 }}>
                            Register To your Account
                        </Text>
                    </View>

                    <View style={{ marginTop: 50 }}>

                        <View >
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                Name
                            </Text>

                            <TextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={{
                                    fontSize: name ? 18 : 18,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 15,
                                    width: 300,
                                }}
                                placeholderTextColor={"black"}
                                placeholder="enter your name"
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
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

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                Image
                            </Text>

                            <TextInput
                                value={image}
                                onChangeText={(text) => setImage(text)}
                                style={{
                                    fontSize: password ? 18 : 18,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 15,
                                    width: 300,
                                }}
                                placeholderTextColor={"black"}
                                placeholder="image"
                            />
                        </View>



                        <Pressable
                            onPress={handleRegister}
                            style={{
                                width: 200,
                                backgroundColor: "#4A55A2",
                                padding: 15,
                                marginTop: 50,
                                marginLeft: "auto",
                                marginRight: "auto",
                                borderRadius: 8,
                            }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: 'center' }}>Register</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={{ marginTop: 15 }}>
                            <Text style={{ textAlign: 'center', color: "gray", fontSize: 16 }}>Already Have account? Sign in</Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})