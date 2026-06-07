import { listPayments, getPaymentOptions, verifyManualPayment } from '../services/payment.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPaymentStatus = (_req, res) => {
  res.json({ success: true, module: 'payments', status: 'ready' });
};

export const getPaymentMethods = (_req, res) => {
  res.json({ success: true, data: { methods: getPaymentOptions() } });
};

export const getAdminPayments = asyncHandler(async (req, res) => {
  const payments = await listPayments(req.query);
  res.json({ success: true, data: { payments } });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const payment = await verifyManualPayment({
    paymentId: req.validated.params.paymentId,
    status: req.validated.body.status,
    note: req.validated.body.note,
    adminId: req.user.id
  });

  res.json({ success: true, data: { payment } });
});
