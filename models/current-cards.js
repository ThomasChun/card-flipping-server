'use strict';

const mongoose = require('mongoose');

const currentCardsSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    sport: { type: String },
    year: { type: String },
    playerName: { type: String, required: true },
    cardDetails: { type: String, required: true },
    brand: { type: String },
    purchasePrice: { type: String, required: true },
    purchaseDate: { type: String },
    purchasedFrom: { type: String },
    salePrice: { type: String },
    profit: { type: Number },
    saleDate: { type: String },
    listedOn: { type: String },
    rookie: { type: Boolean },
    refractor: { type: Boolean },
    insert: { type: Boolean },
    serialNumbered: { type: Boolean },
    autograph: { type: Boolean },
    memorabilia: { type: Boolean },
    graded: { type: Boolean },
    shortPrint: { type: Boolean },
    error: { type: Boolean },
  }
);

currentCardsSchema.set('timestamps', true);

currentCardsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, res) => {
    delete res._id;
    delete res.__v;
  }
});

module.exports = mongoose.model('CurrentCards', currentCardsSchema);