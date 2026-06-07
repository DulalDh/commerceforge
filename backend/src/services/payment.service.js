import { PAYMENT_METHODS, PAYMENT_STATUS } from '../constants/payments.js';
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { AppError } from '../utils/AppError.js';
import { createSslCommerzSession } from './sslcommerz.service.js';

export const createPaymentForOrder = async ({ order, user, paymentDetails = {} }) => {
  const payload = {
    order: order.id,
    user: user.id || user,
    method: order.paymentMethod,
    amount: order.totalAmount,
    status: PAYMENT_STATUS.PENDING
  };

  if ([PAYMENT_METHODS.BKASH_MANUAL, PAYMENT_METHODS.NAGAD_MANUAL].includes(order.paymentMethod)) {
    if (!paymentDetails.transactionId) {
      throw new AppError('Transaction ID is required for manual mobile payment', 400);
    }

    payload.transactionId = paymentDetails.transactionId;
    payload.senderNumber = paymentDetails.senderNumber;
  }

  if (order.paymentMethod === PAYMENT_METHODS.CASH_ON_DELIVERY) {
    payload.status = PAYMENT_STATUS.PENDING;
  }

  if (order.paymentMethod === PAYMENT_METHODS.SSLCOMMERZ) {
    payload.gatewayPayload = await createSslCommerzSession({ order, user });
  }

  return Payment.create(payload);
};

export const getPaymentOptions = () => [
  { value: PAYMENT_METHODS.CASH_ON_DELIVERY, label: 'Cash on Delivery', requiresTransactionId: false },
  { value: PAYMENT_METHODS.BKASH_MANUAL, label: 'bKash manual payment', requiresTransactionId: true },
  { value: PAYMENT_METHODS.NAGAD_MANUAL, label: 'Nagad manual payment', requiresTransactionId: true },
  { value: PAYMENT_METHODS.SSLCOMMERZ, label: 'SSLCommerz', requiresTransactionId: false, placeholder: true }
];

export const listPayments = async (query = {}) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.method) filter.method = query.method;

  return Payment.find(filter)
    .populate('order', 'orderStatus totalAmount trackingId')
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });
};

export const verifyManualPayment = async ({ paymentId, status, note, adminId }) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (![PAYMENT_METHODS.BKASH_MANUAL, PAYMENT_METHODS.NAGAD_MANUAL].includes(payment.method)) {
    throw new AppError('Only manual bKash or Nagad payments can be verified here', 400);
  }

  payment.status = status;
  payment.verificationNote = note;
  payment.verifiedBy = adminId;
  payment.verifiedAt = new Date();
  await payment.save();

  await Order.findByIdAndUpdate(payment.order, {
    paymentStatus: status,
    paymentDetails: {
      transactionId: payment.transactionId,
      senderNumber: payment.senderNumber,
      verificationNote: note,
      verifiedBy: adminId,
      verifiedAt: payment.verifiedAt
    }
  });

  return payment.populate([
    { path: 'order', select: 'orderStatus totalAmount trackingId' },
    { path: 'user', select: 'name email phone' }
  ]);
};
