const EmiInstallment = require('../models/emi.model');

exports.createMultipleInstallments = async (installmentsData) => {
  try {
    const installments = await EmiInstallment.insertMany(installmentsData);
    return installments;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findOneInstallment = async (query) => {
  try {
    return await EmiInstallment.findOne(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateInstallmentStatus = async (id, updateData) => {
  try {
    return await EmiInstallment.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllInstallments = async (query = {}) => {
  try {
    return await EmiInstallment.find(query)
      .sort({ installmentNumber: 1 })
      .populate('paymentId')
      .populate('userId');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findInstallmentById = async (id) => {
  try {
    return await EmiInstallment.findById(id).populate('paymentId');
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.findInstallmentsByPaymentId = async (paymentId) => {
  try {
    return await EmiInstallment.find({ paymentId })
      .sort({ installmentNumber: 1 });
  } catch (err) {
    throw new Error(err.message);
  }
};



