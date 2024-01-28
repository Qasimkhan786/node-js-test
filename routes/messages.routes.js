const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.route('/sendmessages').post(messageController.SendMessages);
router.route('/chat-list-get/:username').get(messageController.ChatListSearch);
router.route('/search/:query').get(messageController.SearchFeature);
router.route('/delete-for-me/:messageId').delete(messageController.deleteMessages);
router.route('/delete-for-everyone/:messageId').delete(messageController.deleteMessages);

module.exports = router;