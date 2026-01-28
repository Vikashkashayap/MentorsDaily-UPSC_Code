const mongoose =require ('mongoose');

const uploadedDocumentsSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
});

const UploadedDocuments = mongoose.model('UploadedDocuments', uploadedDocumentsSchema);
module.exports = UploadedDocuments;