const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: { type: String, default: '' },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isDeletedForEveryOne: {
        type: Boolean,
        default: false,
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;