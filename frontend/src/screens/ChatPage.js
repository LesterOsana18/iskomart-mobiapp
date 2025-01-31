// CHAT PAGE SCREEN

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data, findUserById } from '../data/Data'; // Import the entire data object

const ChatPage = ({ navigation, route }) => {
  const { user_id, receiver_id } = route.params;
  console.log('ChatPage params:', { user_id, receiver_id });

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    console.log("ChatPage received params:", route.params);
  
    const { user_id, receiver_id } = route.params;
  
    // Filter messages for the specific user_id and receiver_id
    const userMessages = data.messages.filter(
      (msg) =>
        (msg.sender_id === user_id && msg.receiver_id === receiver_id) || 
        (msg.sender_id === receiver_id && msg.receiver_id === user_id)
    );
  
    console.log("Filtered messages for userId:", user_id, userMessages);
    setMessages(userMessages); // Set the filtered messages
    
    // Find user info for the receiver
    const receiver = findUserById(receiver_id);
    if (receiver) {
      setUserName(receiver.username);
      setAvatar(receiver.avatar);
    }
  }, [user_id, receiver_id]); // Ensure the effect runs when these values change

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        message_id: Date.now().toString(),
        sender_id: user_id,
        receiver_id: receiver_id,
        text: inputText,
        time: new Date().toLocaleTimeString(),
      };

      // Update the state properly
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      data.messages.push(newMessage); // Persist to data.js
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sender_id === user_id ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Image source={{ uri: avatar || 'https://via.placeholder.com/40' }} style={styles.avatar} />
          <Text style={styles.userName}>{userName || 'Unknown'}</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.message_id}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={25} color="#007AFF" />
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
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F9C2D0',
    paddingTop: 20,
  },
  arrowContainer: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    marginRight: 10,
  },
});

export default ChatPage;
