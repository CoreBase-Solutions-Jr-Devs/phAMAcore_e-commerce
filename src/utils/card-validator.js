import cardValidator from "card-validator";

export const validateCardNumber = (number) => {
  const result = cardValidator.number(number);
  return {
    ...result,
    message: result.isValid ? "Card number is valid" : "Card number is invalid",
  };
};

export const validateExpirationDate = (month, year) => {
  const result = cardValidator.expirationDate({ month, year });
  return {
    ...result,
    message: result.isValid ? "Expiration date is valid" : "Expiration date is invalid or expired",
  };
};

export const validateCvv = (cvvValue, cardType = null) => {
  const maxLength = cardType === "american-express" ? 4 : 3;
  const result = cardValidator.cvv(cvvValue, maxLength);
  return {
    ...result,
    message: result.isValid ? "CVV is valid" : "CVV is invalid",
  };
};

export const validateCardholderName = (name) => {
  const result = cardValidator.cardholderName(name);
  return {
    ...result,
    message: result.isValid ? "Cardholder name is valid" : "Cardholder name is invalid",
  };
};

export const validatePostalCode = (postalCode, options = {}) => {
  const result = cardValidator.postalCode(postalCode, options);
  return {
    ...result,
    message: result.isValid ? "Postal code is valid" : "Postal code is invalid",
  };
};