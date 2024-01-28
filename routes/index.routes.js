const express = require('express');
const routes = express.Router();

const messagesRoutes = require('./messages.routes')
const userRoutes = require('./user.routes');

routes.use('/chat', messagesRoutes)
routes.use('/user', userRoutes);


module.exports = routes;