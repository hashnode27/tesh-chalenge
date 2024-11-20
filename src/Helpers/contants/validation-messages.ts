export const VALIDATION_MESSAGES = {
  reservationDate: {
    isDate: 'Reservation date must be a valid date',
  },
  reservationTime: {
    isString: 'Reservation time must be a valid time string',
  },
  partySize: {
    isInt: 'Party size must be a number',
    min: 'Party size must be at least 1',
  },
  status: {
    isEnum: 'Invalid reservation status',
  },
  specialRequests: {
    isString: 'Special requests must be text',
  },
  restaurantId: {
    isInt: 'Restaurant ID must be a number',
  },
  customerId: {
    isInt: 'Customer ID must be a number',
  },
};
