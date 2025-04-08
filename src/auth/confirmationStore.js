// auth/confirmationStore.js
let confirmationResult = null;

export const setConfirmation = (confirmation) => {
  confirmationResult = confirmation;
};

export const getConfirmation = () => confirmationResult;
