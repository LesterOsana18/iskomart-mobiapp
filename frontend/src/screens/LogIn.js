// LOGIN SCREEN

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';

const LogIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the backend login endpoint
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate('Home', { user: response.data.userData });
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Alert.alert('Error', 'Invalid username or password');
      } else {
        console.error('Error during login:', err);
        Alert.alert('Error', 'Something went wrong. Please try again later');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/*logo*/}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/*pink background*/}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Sign in</Text>

        {/* Username Input */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7EA",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 319,
    height: 280,
    position: 'absolute',
    top: 100,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: "#F9C2D0",
    padding: 20,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    alignItems: 'center',
    paddingBottom: 115,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  signInButton: {
    backgroundColor: '#FFDC9A',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
    borderWidth: 2,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LogIn;
