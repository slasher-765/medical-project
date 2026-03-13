const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: true,
            select: false, // Don't return password by default
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

// Index for faster lookups
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
