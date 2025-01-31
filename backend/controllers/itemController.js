const { getAllItems, getItemsByUser, createItem, likeItem, unlikeItem } = require('../models/ItemModel');
// Get all items
const getItems = async (req, res) => {
    try {
        const items = await getAllItems();
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ message: "Error fetching items" });
    }
};

// Get items by user ID
const getUserItems = async (req, res) => {
    const { user_id } = req.params;
    try {
        const items = await getItemsByUser(user_id);
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching user items:", err);
        res.status(500).json({ message: "Error fetching user items" });
    }
};

// Create a new item
const addItem = async (req, res) => {
    const { user_id, item_price, item_category } = req.body;
    const item_photo = req.file ? req.file.filename : null; // If image is uploaded

    if (!user_id || !item_price || !item_category) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newItemId = await createItem(user_id, item_price, item_photo, item_category);
        res.status(201).json({ message: "Item created successfully", item_id: newItemId });
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).json({ message: "Error creating item" });
    }
};

// Like an item
const likeItemController = async (req, res) => {
    const { item_id } = req.params;
    try {
        await likeItem(item_id);
        res.status(200).json({ message: "Item liked successfully" });
    } catch (err) {
        console.error("Error liking item:", err);
        res.status(500).json({ message: "Error liking item" });
    }
};

// Unlike an item
const unlikeItemController = async (req, res) => {
    const { item_id } = req.params;
    try {
        await unlikeItem(item_id);
        res.status(200).json({ message: "Item unliked successfully" });
    } catch (err) {
        console.error("Error unliking item:", err);
        res.status(500).json({ message: "Error unliking item" });
    }
};

module.exports = { getItems, getUserItems, addItem, likeItemController, unlikeItemController };
