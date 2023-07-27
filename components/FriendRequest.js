import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    // console.log("Check item >>>>>", item)
    return (
        <Pressable
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10
            }}>
            <Image
                style=
                {{
                    width: 50,
                    height: 50,
                    borderRadius: 25
                }}
                source={{ uri: item.image }}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold", flex: 1, marginLeft: 10 }}>{item?.name} sent you a friend request</Text>


            <Pressable style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}>
                <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
            </Pressable>
        </Pressable>

    )
}

export default FriendRequest

const styles = StyleSheet.create({})