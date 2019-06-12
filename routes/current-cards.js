'use strict';

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const CurrentCards = require('../models/current-cards');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
router.use(jwtAuth);

router.get('/', jwtAuth, (req, res, next) => {
  CurrentCards.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.put('/', jwtAuth, (req, res, next) => {
  const { user, autograph, brand, cardDetails, error, graded, insert, listedOn, memorabilia, playerName, purchaseDate, purchasePrice, purchasedFrom, refractor, rookie, saleDate, salePrice, serialNumbered, shortPrint, sport, year, cardId } = req.body;
  const newCard = { user, autograph, brand, cardDetails, error, graded, insert, listedOn, memorabilia, playerName, purchaseDate, purchasePrice, purchasedFrom, refractor, rookie, saleDate, salePrice, serialNumbered, shortPrint, sport, year, cardId };
  console.log(cardId);
  if (!user) {
    const err = new Error('Missing `user` in request body');
    err.status = 400;
    return next(err);
  }

  if (!playerName) {
    const err = new Error('Missing `playerName` in request body');
    err.status = 400;
    return next(err);
  }

  if (!cardDetails) {
    const err = new Error('Missing `cardDetails` in request body');
    err.status = 400;
    return next(err);
  }

  if (!purchasePrice) {
    const err = new Error('Missing `purchasePrice` in request body');
    err.status = 400;
    return next(err);
  }
  CurrentCards.findOneAndUpdate({user: req.body.user}, newCard, {new: true, upsert: true})
    .then(result => {
      res.location(`${req.baseUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

module.exports = router;