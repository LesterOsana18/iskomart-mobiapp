export const data = {
    users: [
      {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        username: 'john_doe',
        email: 'john@gmail.com',
        password: 'password',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        user_id: 2,
        first_name: 'Jane',
        last_name: 'Doe',
        username: 'rei',
        email: 'rei',
        password: '12345',
        avatar: 'https://via.placeholder.com/50',
      },
      {
        user_id: 3,
        first_name: 'lester',
        last_name: 'Doe',
        username: 'lester',
        email: 'john@gmail.com',
        password: 'password',
        avatar: 'https://via.placeholder.com/50',
      },
    ],
    
    items: [// FK to users from sender_id
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
      },
      {
        item_id: 2,
        user_id: 1,
        date: '2022-10-01',
        item_price: 500,
        item_name: 'Laptop',
        item_photo: 'https://via.placeholder.com/150',
        likes: 0,
        messages: 0,
        liked: false,
        item_category: '2',
      },
      {
        item_id: 3,
        user_id: 3,
        date: '2022-10-01',
        item_price: 500,
        item_name: 'Laptop',
        item_photo: 'https://via.placeholder.com/150',
        likes: 0,
        messages: 0,
        liked: false,
        item_category: '2',
      },
      {
        item_id: 4,
        user_id: 2,
        date: '2022-10-01',
        item_price: 500,
        item_name: 'Laptop',
        item_photo: 'https://via.placeholder.com/150',
        likes: 0,
        messages: 0,
        liked: false,
        item_category: '2',
      },
    ],
    
    messages: [ //FK user using sender_id and receiver_id, FK item using item_id
      {
        message_id: 10,
        sender_id: 1,
        item_id: 4,
        receiver_id: 2,
        text: 'Hello',
        time: '2022-10-01T10:00:00',
      },  
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
  export const addMessage = (sender_id, item_id, text, time) => {
    if (!Array.isArray(data.messages)) {
      data.messages = [];
    }
  
    const newMessage = {
      message_id: data.messages.length + 1,
      sender_id: sender_id,
      item_id: item_id,
      text: text,
      time: time,
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
    likes: 0, // Default likes to 0
    liked: false, // Default liked to false
  };

  data.items.push(newItem);

  // Log the new item created
  console.log('New Item Created:', newItem);

  // Log the current list of items
  console.log('Current Items in the JSON:', data.items);
};

  // Toggle like function
  export const toggleLike = (item_id) => {
    const item = data.items.find(post => post.item_id === item_id);
    if (item) {
      item.liked = !item.liked;
      item.likes = item.liked ? item.likes + 1 : item.likes - 1;
    }
  };
  