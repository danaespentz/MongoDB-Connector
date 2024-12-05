const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    person: {
        name: {
            type: String,
            required: true
        },
        idcard: {
            type: String,
            required: true
        },
        alert: [
            {
                category: {
                    type: String,
                    required: false
                },
                description: {
                    type: String,
                    required: false
                },
                action: {
                    type: String,
                    required: false
                },
                photo: {
                    type: String, 
                    required: false
                }
            }
        ]
    },
    visa: {
        number: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        issuer: {
            type: String,
            required: false
        },
        date: {
            type: Date, 
            required: false
        },
        type: {
            type: String,
            required: false
        }
    },
    vehicle: {
        make: {
            type: String,
            required: false
        },
        model: {
            type: String,
            required: false
        },
        year: {
            type: Number,
            required: false
        }
    }
});

module.exports = mongoose.model('Person', personSchema);