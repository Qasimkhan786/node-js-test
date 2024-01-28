const messageSchema = require('../models/message.model');
const userSchema = require('../models/user.model');
const { sendPrivateMessage } = require('../sockets');

const SendMessages = async (req, res) => {
    try {
        const { message, sender, receiver } = req.body;
        if (!message || !sender || !receiver) {
            return res.status(400).json({
                message: "Something is missing",
                status: false
            })
        }
        const newMessage = new messageSchema({ text: message, sender: sender, receiver: receiver });
        newMessage.save();
        sendPrivateMessage(receiver, message);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Internal server error.",
            status: false
        })
    }
}

const ChatListSearch = async (req, res) => {
    const username = req.params.username;
    try {
        const chats = await messageSchema.find({ $or: [{ sender: username }, { receiver: username }] });
        res.json(chats);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const SearchFeature = async (req, res) => {
    const query = req.params.query;
    try {
        const users = await userSchema.find({ username: { $regex: query, $options: 'i' } });
        const messages = await messageSchema.find({ text: { $regex: query, $options: 'i' } });
        res.json({ users, messages });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const deleteMessages = async (req, res) => {
    const messageId = req.params.messageId;
    try {
        await messageSchema.findByIdAndUpdate(messageId, { isDeleted: true }, { new: true }).then((result) => {
            if (result) {
                res.status(200).send('Message deleted Successfully');
            } else {
                res.status(400).send({
                    message: "Something went wrong while deleting message.",
                    status: false
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Something went wrong while deleting message.",
                status: false
            });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteMessagesForEveryOne = async (req, res) => {
    const messageId = req.params.messageId;
    try {
        messageSchema.findByIdAndUpdate(messageId, { isDeletedForEveryOne: true }, { new: true }).then((result) => {
            if (result) {
                res.status(200).send('Message deleted for everyone.');
            } else {
                res.status(400).send({
                    message: "Something went wrong while deleting message.",
                    status: false
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Something went wrong while deleting message.",
                status: false
            });
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    SendMessages,
    ChatListSearch,
    SearchFeature,
    deleteMessages,
    deleteMessagesForEveryOne
}