export const data = {
    users: [
      {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        username: 'john_doe',
        email: 'john@gmail.com',
        password: 'password',
      },
      {
        user_id: 2,
        first_name: 'Jane',
        last_name: 'Doe',
        username: 'rei',
        email: 'rei',
        password: '12345',
      },
    ],
    // FK to users from user_id
    items: [
      {
        item_id: 1,
        user_id: 1,
        date: '2022-10-01',
        item_price: 500,
        item_name: 'Laptop',
        item_photo: 'https://via.placeholder.com/150',
        likes: 0,
        messages: 0,
        liked: false,
        item_category: '2',
      }
    ],
    // FK to users from sender_id
    messages: [
      {
        message_id: 1,
        receiver_id: 1,
        text: 'filler',
        sender_id: 2,
        time: '1:30 PM',
        avatar: 'https://via.placeholder.com/50',
      }
    ]
  };
  
  // Function to add a new user
  export const addUser = (firstName, lastName, username, email, password) => {
    if (!Array.isArray(data.users)) {
      data.users = [];
    }
  
    const newUser = {
      user_id: Math.max(...data.users.map(user => user.user_id), 0) + 1, // Increment user_id based on the highest existing user_id
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
    };
  
    data.users.push(newUser);
  };
  
  // Function to find a user by username
  export const findUserByUsername = (username) => {
    if (!Array.isArray(data.users)) {
      data.users = [];
    }
  
    const user = data.users.find(user => user.username === username);
    return user || null;
  };
  
  // Function to find a user by email
  export const findUserByEmail = (email) => {
    if (!Array.isArray(data.users)) {
      data.users = [];
    }
  
    const user = data.users.find(user => user.email === email);
    return user || null;
  };
  
  // Function to add a message
  export const addMessage = (sender_id, receiver_id, text, time, avatar) => {
    if (!Array.isArray(data.messages)) {
      data.messages = [];
    }
  
    const newMessage = {
      message_id: data.messages.length + 1,
      sender_id: sender_id,
      receiver_id: receiver_id, // Fixed the spelling of "receiver_id"
      text: text,
      time: time,
      avatar: avatar,
    };
  
    data.messages.push(newMessage);
  };
  
  // Function to find a user by user_id
  export const findUserById = (user_id) => {
    if (!Array.isArray(data.users)) {
      data.users = [];
    }
  
    const user = data.users.find(user => user.user_id === user_id);
    return user || null;
  };
  
  // Function to add a new item
  export const addItem = (item_photo, item_name, item_price, item_description, item_category, user_id) => {
    if (!Array.isArray(data.items)) {
      data.items = [];
    }
  
    const newItem = {
      item_id: Math.max(...data.items.map(item => item.item_id), 0) + 1, // Increment item_id based on the highest existing item_id
      item_photo: item_photo,
      item_name: item_name,
      item_price: item_price,
      item_description: item_description,
      item_category: item_category,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      user_id: user_id, // Include the user_id in the item object
    };
  
    data.items.push(newItem);
  
    // Log the new item created
    console.log('New Item Created:', newItem);
  
    // Log the current list of items
    console.log('Current Items in the JSON:', data.items);
  };
  