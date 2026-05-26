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
    pdfUrl: {
        type: String,
        trim: true,
        default: '',
    },
    fileSize: {
        type: String,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    subcategory: {
        type: String,
        trim: true
    },
    // Keep categories array for backward compatibility (deprecated)
    categories: [{
        type: String,
        trim: true
    }],
    subject: {
        type: String,
        trim: true
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

freeResourceSchema.index({ isActive: 1, createdAt: -1 });
freeResourceSchema.index({ isActive: 1, category: 1, createdAt: -1 });
freeResourceSchema.index({ isActive: 1, subcategory: 1, createdAt: -1 });
freeResourceSchema.index({ isActive: 1, subject: 1, createdAt: -1 });

const FreeResource = mongoose.model('FreeResource', freeResourceSchema);
module.exports = FreeResource;
