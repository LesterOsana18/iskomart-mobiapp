import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data } from '../data/Data'; // Import the entire data object from Data.js

const ChatPage = ({ navigation, route }) => {
  const { userName, avatar, userId } = route.params; // Expecting userId from route params
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Load existing messages based on sender_id and reciever_id
    const userMessages = data.messages.filter(
      (msg) => msg.sender_id === userId || msg.reciever_id === userId
    );
    setMessages(userMessages);
  }, [userId]);

  const analyzeEmotion = (input) => {
    if (input.toLowerCase().includes('available')) {
      return "Yes, it's still available.";
    } else if (input.toLowerCase().includes('how much')) {
      return "The price is P50.00.";
    } else {
      return "Can you repeat that?";
    }
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        message_id: Date.now().toString(),
        sender_id: userId,
        reciever_id: 2, // Assuming user with ID 2 is the bot or the recipient
        text: inputText,
        time: new Date().toLocaleTimeString(),
        avatar: avatar,
      };
      const botReply = {
        message_id: (Date.now() + 1).toString(),
        sender_id: 2, // Bot's ID
        reciever_id: userId,
        text: analyzeEmotion(inputText),
        time: new Date().toLocaleTimeString(),
        avatar: 'https://via.placeholder.com/50', // Bot's avatar
      };

      // Update the state and the data object
      setMessages([...messages, newMessage, botReply]);
      data.messages.push(newMessage, botReply); // Update Data.js messages
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sender_id === userId ? styles.myMessage : styles.otherMessage]}>
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
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{userName}</Text>
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
    paddingTop: 20, // Adds space at the top to adjust the arrow position
  },
  arrowContainer: {
    marginRight: 10, // Adds some space between the arrow and the avatar
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, // Space between avatar and user name
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
