import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: 2,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      match: [/^\+\d{1,3}\d{6,14}$/, 'Invalid phone number format'],
      index: true,
    },
    notes: {
      type: String,
      required: [true, 'Notes are required'],
      maxlength: 500,
      trim: true,
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
      required: [true, 'Assigned agent is required'],
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploaded by user is required'],
    },
    uploadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      required: [true, 'Upload reference is required'],
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
