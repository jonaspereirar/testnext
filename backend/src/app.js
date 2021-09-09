const express = require('express');
require('express-async-errors');

const authController = require('./controllers/authController')
const settingsController = require('./controllers/settingsController')
const authMiddleware = require('./middlewares/authMiddleware')

const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/errorMiddleware');


const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.post('/login', authController.doLogin);

app.get('/settings', authMiddleware, settingsController.getSettings);

app.post('/logout', authController.doLogout);

app.use(errorMiddleware);

module.exports = app;