'use strict';

const express = require('express');

const users = require('./users');
const auth = require('./auth');
const cards = require('./cards');

const router = express.Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/cards', cards);

module.exports = router;