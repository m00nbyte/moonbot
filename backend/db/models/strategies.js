// modules
const mongoose = require('mongoose');

const { Schema } = mongoose;

const StrategiesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    currency: {
        type: String
    },
    active: {
        type: String,
        default: 'simple'
    },
    select: {
        type: String,
        default: 'simple'
    },
    types: {
        simple: {
            minAmount: {
                type: Number
            },
            minRate: {
                type: Number
            },
            minPeriod: {
                type: Number
            }
        },
        equal: {
            minAmount: {
                type: Number
            },
            splitAllIn: {
                type: Number
            },
            splitUnit: {
                type: Number
            },
            overAmount: {
                type: Number
            },
            periodMap: [[{ type: Number }, { type: Number }]]
        },
        pyramid: {
            minAmount: {
                type: Number
            },
            minRate: {
                type: Number
            },
            lowBoundRate: {
                type: Number
            },
            upBoundRate: {
                type: Number
            },
            growExponential: {
                type: Number
            },
            overAmount: {
                type: Number
            },
            skipRemaining: {
                type: Number
            },
            rapMap: [[{ type: Number }, { type: Number }, { type: Number }]]
        }
    }
});

const Strategy = mongoose.model('strategies', StrategiesSchema);

module.exports = Strategy;
