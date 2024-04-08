const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        default: '',
        validate: {
            validator: (value) => {
                // Use a regular expression to validate the email format
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return !value || emailRegex.test(value); // Only validate if the email is provided
            },
            message: 'Invalid email format',
        },
    },
    phone: {
        type: String,
        unique: true,
        default: '',
        maxlength: 15,
        validate: {
            validator: (value) => {
                // You can add custom phone number validation logic here
                // This is a simple example that checks if it contains only digits
                return !value || /^\d+$/.test(value); // Only validate if the phone is provided
            },
            message: 'Invalid phone number format',
        },
    },
    first_name: {
        type: String,
        default: '',
        maxlength: 40,
    },
    last_name: {
        type: String,
        default: '',
        maxlength: 40,
    },
    dial_code: {
        type: String,
        default: 101,
        maxlength: 8,
    },
    password: {
        type: String,
        default: ''
    },
    host_name: {
        type: String,
        default: '',
        maxlength: 40,
    },
    website: {
        type: String,
        default: ''
    },
    feedback_rating: {
        type: Number,
        default: '',
        maxlength: 5,
    },
    feedback_suggestion: {
        type: String,
        default: '',
        maxlength: 280,
    },
    tech_support: {
        type: String,
        default: '',
        maxlength: 280,
    },
});

userSchema.index({ email: 1, phone: 1 }, {
    unique: true,
    partialFilterExpression: {
        phone: { $exists: true, $ne: "" },
    },
});

const User = mongoose.models.users || mongoose.model('users', userSchema)

module.exports = User;