const express = require('express');
const router = express.Router();
const multer = require('multer');
const itemController = require('../controllers/itemController');

// [NOTE]: Not sure about this yet. May or may not need it.
// // Multer setup for image uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'), // Store images in 'uploads/' folder
//     filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// Routes
router.get('/items', itemController.getItems); // Get all items
router.get('/items/:user_id', itemController.getUserItems); // Get items by user
router.post('/items', upload.single('item_photo'), itemController.addItem); // Add item with image
router.post('/items/:item_id/like', itemController.likeItemController); // Like an item
router.post('/items/:item_id/unlike', itemController.unlikeItemController); // Unlike an item

module.exports = router;
