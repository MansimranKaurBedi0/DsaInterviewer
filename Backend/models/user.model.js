import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  progress: {
    arrays: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    two_pointers: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    linked_list: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    trees: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    sliding_window: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    stack: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    binary_search: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' },
    graphs: { type: String, enum: ['Not Started', 'Needs Review', 'Doing Well'], default: 'Not Started' }
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
