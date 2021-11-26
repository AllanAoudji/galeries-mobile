export const selectConfirmAccountStatus = (state: Store.Reducer) =>
    state.confirmAccount.status;
export const selectConfirmAccountFieldsError = (state: Store.Reducer) =>
    state.confirmAccount.fieldsError;
