// MESSAGING SCREEN

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data, findUserById } from '../data/Data';  // Importing the data object

const Messaging = ({ navigation, route }) => {
  const { user_id } = route.params;  // Get the user_id passed from Home
  console.log("Home Screen user_id:", user_id);

  // Filter messages by user_id, ensuring we get messages where the user is either sender or receiver
  const filteredMessages = data.messages.filter(
    message => message.sender_id === user_id || message.receiver_id === user_id
  );
  
  // Group messages by receiver_id and get the latest message for each receiver
  const latestMessages = Object.values(
    filteredMessages.reduce((acc, message) => {
      const partnerId = message.sender_id === user_id ? message.receiver_id : message.sender_id;

      // If no message exists for the receiver, or the current message is later, replace it
      if (!acc[partnerId] || new Date(acc[partnerId].time) < new Date(message.time)) {
        acc[partnerId] = message;
      }
      
      return acc;
    }, {})
  );
  

  // Render the latest message for each receiver
  const renderMessage = ({ item }) => {
    // Identify if the current user_id is the sender or receiver
    const isSender = item.sender_id === user_id;
  
    // Find the other user (chat partner)
    const chatPartnerId = isSender ? item.receiver_id : item.sender_id;
    const chatPartner = findUserById(chatPartnerId);
  
    return (
      <TouchableOpacity 
        key={item.id}  // Ensure each message has a unique key based on the message ID
        style={styles.messageContainer} 
        onPress={() => {
          navigation.navigate('ChatPage', { 
            userName: chatPartner ? chatPartner.username : 'Unknown',
            item_id: item.item_id,
            user_id: user_id, // Current user
            receiver_id: chatPartnerId, // Pass the receiver_id
          });
        }}
      >
        <Image 
          source={{ uri: chatPartner ? chatPartner.avatar : 'https://via.placeholder.com/50' }} 
          style={styles.avatar} 
        />
        <View style={styles.messageInfo}>
          <Text style={styles.userName}>{chatPartner ? chatPartner.username : 'Unknown'}</Text>
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
        data={latestMessages}  // Use only the latest message for each receiver
        renderItem={renderMessage}
        keyExtractor={(item) => item.message_id.toString()}
        style={styles.messagesList}
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
