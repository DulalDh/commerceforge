import { DELIVERY_AREAS, SHIPPING_CHARGES } from '../constants/shipping.js';

export const resolveDeliveryArea = (shippingAddress = {}) => {
  const district = shippingAddress.district?.trim().toLowerCase();
  return district === 'dhaka' ? DELIVERY_AREAS.INSIDE_DHAKA : DELIVERY_AREAS.OUTSIDE_DHAKA;
};

export const calculateShippingCharge = (deliveryArea) => {
  return SHIPPING_CHARGES[deliveryArea] ?? SHIPPING_CHARGES[DELIVERY_AREAS.OUTSIDE_DHAKA];
};

export const calculateEstimatedDeliveryDate = (deliveryArea, fromDate = new Date()) => {
  const days = deliveryArea === DELIVERY_AREAS.INSIDE_DHAKA ? 2 : 5;
  const date = new Date(fromDate);
  date.setDate(date.getDate() + days);
  return date;
};
