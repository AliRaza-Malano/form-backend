const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const studentAdmissionSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  studentPicture: {
    type: String, // Base64 string or URL
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10,15}$/, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  country: {
    type: String,
    default: 'Pakistan'
  },

  // Guardian Information
  guardianName: {
    type: String,
    required: true
  },
  guardianRelation: {
    type: String,
    required: true
  },

  // Academic Information
  previousSchool: {
    type: String
  },
  lastClass: {
    type: String
  },

  // Admission Details
  admissionClass: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },

  // System Fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Auto-update updatedAt before save
studentAdmissionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Auto-increment studentId
studentAdmissionSchema.plugin(AutoIncrement, { inc_field: 'studentId' });

module.exports = mongoose.model('StudentAdmission', studentAdmissionSchema);
