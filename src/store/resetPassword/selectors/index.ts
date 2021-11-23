export const selectResetPasswordCurrent = (state: Store.Reducer) =>
    state.resetPassword.current;
export const selectResetPasswordFieldErrors = (state: Store.Reducer) =>
    state.resetPassword.fieldsError;
export const selectResetPasswordStatus = (state: Store.Reducer) =>
    state.resetPassword.status;
