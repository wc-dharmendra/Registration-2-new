const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    // sub_categories: [this]
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 40,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        maxlength: 280,
        default: ''
    },
    start_date: {
        type: String,
        required: true,
        default: ''
    },
    end_date: {
        type: String,
        required: true,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    time_zone: {
        type: String,
        default: 'Asia/Kolkata'
    },
    layout: {
        type: String,
        default: 'Top/Bottom'
    },
    theme: {
        type: String,
        default: 'Minimal'
    },
    pattern: {
        type: String,
        default: 'Cross'
    },
    color: {
        type: String,
        default: 'red'
    },
    type_face: {
        type: String,
        default: 'Default'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true
    },
    categories: [{
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        order: {
            type: Number,
            default: 0
        },
    }]
});

const Event = mongoose.models.events || mongoose.model('events', eventSchema);

module.exports = Event;
