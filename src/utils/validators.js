const Joi = require('joi');

const validators = {
  // Patient validators
  createPatient: Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[\d\s\-\+\(\)]+$/).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('M', 'F', 'Other').required(),
    address: Joi.string().max(500).optional(),
    city: Joi.string().max(100).optional(),
    state: Joi.string().max(100).optional(),
    zipCode: Joi.string().max(20).optional(),
    bloodType: Joi.string().valid('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-').optional(),
    allergies: Joi.string().optional(),
    medicalHistory: Joi.string().optional(),
    emergencyContactName: Joi.string().max(100).optional(),
    emergencyContactPhone: Joi.string().pattern(/^[\d\s\-\+\(\)]+$/).optional(),
    insuranceProvider: Joi.string().max(100).optional(),
    insurancePolicyNumber: Joi.string().max(100).optional(),
    status: Joi.string().valid('active', 'inactive', 'suspended').optional()
  }),

  updatePatient: Joi.object({
    firstName: Joi.string().min(2).max(100).optional(),
    lastName: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[\d\s\-\+\(\)]+$/).optional(),
    dateOfBirth: Joi.date().optional(),
    gender: Joi.string().valid('M', 'F', 'Other').optional(),
    address: Joi.string().max(500).optional(),
    city: Joi.string().max(100).optional(),
    state: Joi.string().max(100).optional(),
    zipCode: Joi.string().max(20).optional(),
    bloodType: Joi.string().valid('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-').optional(),
    allergies: Joi.string().optional(),
    medicalHistory: Joi.string().optional(),
    emergencyContactName: Joi.string().max(100).optional(),
    emergencyContactPhone: Joi.string().pattern(/^[\d\s\-\+\(\)]+$/).optional(),
    insuranceProvider: Joi.string().max(100).optional(),
    insurancePolicyNumber: Joi.string().max(100).optional(),
    status: Joi.string().valid('active', 'inactive', 'suspended').optional()
  }).min(1),

  // Appointment validators
  createAppointment: Joi.object({
    patientId: Joi.string().uuid().required(),
    doctorId: Joi.string().uuid().required(),
    appointmentDate: Joi.date().required(),
    appointmentTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    reason: Joi.string().optional(),
    notes: Joi.string().optional(),
    consultationType: Joi.string().valid('in-person', 'telemedicine', 'phone').optional(),
    duration: Joi.number().min(15).max(480).optional()
  }),

  updateAppointment: Joi.object({
    appointmentDate: Joi.date().optional(),
    appointmentTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    reason: Joi.string().optional(),
    notes: Joi.string().optional(),
    status: Joi.string().valid('scheduled', 'completed', 'cancelled', 'no-show').optional(),
    consultationType: Joi.string().valid('in-person', 'telemedicine', 'phone').optional(),
    duration: Joi.number().min(15).max(480).optional()
  }).min(1),

  // Query validators
  pagination: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc')
  })
};

module.exports = validators;
