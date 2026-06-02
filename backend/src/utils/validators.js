export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  // Must start with + followed by 1-3 digits, then 6-14 more digits
  const regex = /^\+\d{1,3}\d{6,14}$/;
  return regex.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 50;
};

export const validateNotes = (notes) => {
  if (!notes || typeof notes !== 'string') return false;
  const trimmed = notes.trim();
  return trimmed.length > 0 && trimmed.length <= 500;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim();
};
