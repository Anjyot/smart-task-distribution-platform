import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    fileType: {
      type: String,
      required: [true, 'File type is required'],
      trim: true,
    },
    totalRecords: {
      type: Number,
      required: [true, 'Total record count is required'],
      min: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploaded by user is required'],
    },
    uploadDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      trim: true,
      enum: ['Processing', 'Completed', 'Failed'],
      default: 'Processing',
    },
    distributionSummary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model('Upload', uploadSchema);
