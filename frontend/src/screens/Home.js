import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { data } from '../data/Data'; // Import the data object from Data.js

const Home = ({ route, navigation }) => {
  const { user_id } = route.params || {};  // Get the userId passed from LogIn

  console.log("Home Screen user_id:", user_id);

  const [posts, setPosts] = useState(data);  // Set the initial posts to the data array
  const categories = ["Foods", "School Supplies", "Gadgets", "Others"];

  // This effect will run whenever newPost is added
  useEffect(() => {
    if (route.params?.newPost) {
      setPosts((prevPosts) => [route.params.newPost, ...prevPosts]);
    }
  }, [route.params?.newPost]); // Ensure it listens for changes to newPost

  const handleLike = (item_id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.item_id === item_id // Use item_id instead of postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        {/* Use item_photo for the image */}
        <Image source={{ uri: item.item_photo }} style={styles.postImage} />
        <View style={styles.postInfo}>
          {/* Display the user's name using user_id */}
          <Text style={styles.userName}>{`User ${item.user_id}`}</Text>
          {/* Display the date of the item */}
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.postDetails}>
        {/* Display item_price and item_name */}
        <Text style={styles.price}>${item.item_price}</Text>
        <Text style={styles.title}>{item.item_name}</Text>
  
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleLike(item.item_id)} // Assuming you will use item_id for like functionality
          >
            <Icon
              name={item.liked ? 'heart' : 'heart-outline'}
              size={24}
              color={item.liked ? '#F9C2D0' : '#000'}
            />
            <Text style={styles.iconText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="chatbubble-outline" size={24} color="#000" />
            <Text style={styles.iconText}>{item.messages}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{ width: 50, height: 50 }} />
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>

      <Image source={require('../assets/7.png')} />

      <View style={styles.categoriesContainer}>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryButton}>
            <Image
              source={require('../assets/gadgetbutton/foodbutton.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{categories[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <Image
              source={require('../assets/gadgetbutton/suppliesbutton.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{categories[1]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryButton}>
            <Image
              source={require('../assets/gadgetbutton/gadgetsbutton.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{categories[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <Image
              source={require('../assets/gadgetbutton/otherbutton.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{categories[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.item_id.toString()} // Updated to use item.item_id
        style={styles.postsList}
      />

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
          <Icon name="mail" size={25} color="#000" />
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
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 120,
    paddingHorizontal: 10,
    height: 40,
    width: '90%',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#fff',
    padding: 10,
    height: '50',
    borderRadius: 100,
    width: '45%',
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: '5',
    textAlign: 'center',
  },
  postsList: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden', // Prevent content from overflowing
    marginBottom: 20, // Add space at the bottom
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', // Ensure proper alignment of elements
  },
  postImage: {
    height: 200,
    borderRadius: 10,
    width: '100%',
  },
  postInfo: {
    flex: 1,
    justifyContent: 'flex-start', 
    marginLeft: 10, 
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#aaa',
    fontSize: 12,
  },
  postDetails: {
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#555',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    flexWrap: 'wrap', 
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
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

export default Home;
