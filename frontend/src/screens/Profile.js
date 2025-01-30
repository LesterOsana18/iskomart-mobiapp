import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data, findUserById } from '../data/Data'; // Import the data object from Data.js

const Profile = ({ navigation, route }) => {
    const { user_id } = route.params;

    // Find the user based on the user_id
    const user = findUserById(user_id);

    // Filter items to display only those with the same user_id
    const userItems = data.items.filter(item => item.user_id === user_id);

    // If the user is not found, display a message
    if (!user) {
        return (
            <View style={styles.container}>
                <Text>User not found</Text>
            </View>
        );
    }

    // Render a single item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.item_photo }} style={styles.itemImage} />
            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Icon name="heart-outline" size={24} color="#000" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="chatbubble-outline" size={24} color="#000" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={styles.itemName}>{item.item_name}</Text>
            <Text style={styles.itemPrice}>₱{item.item_price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={{ width: 50, height: 50 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>

            {/* Profile info */}
            <View style={styles.profileInfoContainer}>
                <Image source={require('../assets/profilepic.png')} style={styles.profileImage} />
                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.university}>Polytechnic University of the Philippines</Text>
                    <TouchableOpacity>
                        <Text style={styles.editProfile} onPress={() => navigation.navigate('EditProfile', { user_id })}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* line between the profile info and post containers */}
            <View style={styles.line} />

            {/* Items Section */}
            <FlatList
                data={userItems} // filtered items
                    renderItem={renderItem}
                    keyExtractor={(item) => item.item_id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.feedRow}
                    contentContainerStyle={styles.feedContainer}
            />
            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home', { user_id })}>
                    <Icon name="home-outline" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search', { user_id })}>
                    <Icon name="search-outline" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddPost', { user_id })}>
                    <Icon name="add-circle-outline" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Messaging', { user_id })}>
                <Icon name="mail-outline" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { user_id })}>
                    <Icon name="person-outline" size={25} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
 );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f5e8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9C2D0',
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 40,
        left: 25,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    logOutText: {
        position: 'absolute',
        top: 20,
        right: 30,
        fontSize: 14,
        color: '#000',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    university: {
        fontSize: 13,
        color: '#555',
        marginBottom: 10,
    },
    editProfile: {
        fontSize: 12,
        color: '#BBB7B7',
        textDecorationLine: 'underline',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#BBB7B7',
        marginTop: 20,
        width: '87%',
        alignSelf: 'center',
    },
    feedContainer: {
        padding: 10,
    },
    feedRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemContainer: {
        width: '48%', 
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 5,
        borderWidth: 2,
        padding: 10,
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    itemPrice: {
        fontSize: 12,
        color: '#555',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#FFDC9A',
        borderRadius: 110,
        marginHorizontal: 30,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        borderWidth: 2,
        borderColor: '#000',
    },
});

export default Profile;