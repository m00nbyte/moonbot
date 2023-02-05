// modules
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const EarningsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    uid: {
        type: Number,
        unique: true
    },
    currency: {
        type: String
    },
    amount: {
        type: Number
    },
    mts: {
        type: Number
    }
});

EarningsSchema.plugin(paginate);

const Earning = mongoose.model('earnings', EarningsSchema);

module.exports = Earning;
