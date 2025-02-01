const Message = require('../models/Message'); // Import your Message model
const User = require('../models/User'); // Import your User model

// Get messages for a user
const getMessages = async (req, res) => {
  try {
    const { user_id } = req.params;
    const messages = await Message.find({
      $or: [
        { sender_id: user_id },
        { receiver_id: user_id }
      ]
    }).sort({ time: -1 });

    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages', err);
    res.status(500).send('Error fetching messages');
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user', err);
    res.status(500).send('Error fetching user');
  }
};

// Send a message
const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, text, item_id } = req.body;

  const newMessage = new Message({
    sender_id,
    receiver_id,
    text,
    item_id
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message', err);
    res.status(500).send('Error sending message');
  }
};

module.exports = { getMessages, getUserById, sendMessage };
