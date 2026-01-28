const mongoose = require('mongoose');

const freeResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UploadedDocuments',
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    categories: [{
        type: String,
        trim: true
    }],
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Intermediate'
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

freeResourceSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const FreeResource = mongoose.model('FreeResource', freeResourceSchema);
module.exports = FreeResource;
