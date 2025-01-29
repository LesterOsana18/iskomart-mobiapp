import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data, findUserById } from '../data/Data';  // Importing the data object

const Messaging = ({ navigation, route }) => {
  const { userId } = route.params; // Get user_id from navigation params

  // Filter messages where sender_id matches the user_id from params
  const filteredMessages = data.messages.filter(message => message.sender_id === userId);

  // Group messages by receiver_id and get the latest message per receiver
  const latestMessages = Object.values(
    filteredMessages.reduce((acc, message) => {
      acc[message.reciever_id] = message; // Always overwrite to keep the latest message
      return acc;
    }, {})
  );

  const renderMessage = ({ item }) => {
    const receiver = findUserById(item.reciever_id); // Find the receiver using reciever_id
    return (
      <TouchableOpacity 
        style={styles.messageContainer} 
        onPress={() => navigation.navigate('ChatPage', { userName: receiver ? receiver.username : 'Unknown', avatar: item.avatar })}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.messageInfo}>
          <Text style={styles.userName}>{receiver ? receiver.username : 'Unknown'}</Text> 
          <Text style={styles.lastMessage}>{item.text}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 50, height: 50 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search Messages" />
      </View>

      {/* Messages List */}
      <FlatList
        data={latestMessages}  // Display only the latest messages per receiver
        renderItem={renderMessage}
        keyExtractor={(item) => item.message_id.toString()}  
        style={styles.messagesList}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search-outline" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
          <Icon name="add-circle-outline" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messaging')}>
          <Icon name="mail" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
  searchBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 120,
    paddingHorizontal: 10,
    height: 40,
    width: '90%',
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
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

export default Messaging;
