import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserType } from './UserContext'
import FriendRequest from '../components/FriendRequest'

const FriendScreen = () => {
    const { userId, setUserId } = useContext(UserType)
    const [friendRequests, setFriendRequests] = useState([])
    useEffect(() => {
        fetchFriendRequests()
    }, [])
    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(`http://192.168.1.5:8000/friend-request/${userId}`);
            if (response.status === 200) {
                const friendRequestsData = response.data.map((freindRequests) => ({
                    _id: freindRequests._id,
                    name: freindRequests.name,
                    email: freindRequests.email,
                    image: freindRequests.image,
                }))
                setFriendRequests(friendRequestsData)
            }
        } catch (error) {
            console.log("error message", error)

        }
    }

    // console.log(friendRequests);
    return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
            {friendRequests.length > 0 && <Text>Your Friend Request!</Text>}


            {friendRequests.map((item, index) => (
                <FriendRequest
                    key={index}
                    item={item}
                    friendRequests={friendRequests}
                    setFriendRequests={setFriendRequests}
                />
            ))}
        </View>
    )
}

export default FriendScreen

const styles = StyleSheet.create({})