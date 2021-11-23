import {
    RESET_PASSWORD_FIELD_ERRORS_RESET,
    RESET_PASSWORD_FIELD_ERRORS_UPDATE,
} from '#store/resetPassword/actionTypes';

const initialState: { email: string } = { email: '' };
const resetPasswordFieldErrorsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case RESET_PASSWORD_FIELD_ERRORS_RESET:
            return initialState;
        case RESET_PASSWORD_FIELD_ERRORS_UPDATE:
            if (typeof action.payload !== 'object') return state;
            if (typeof action.payload.email !== 'string') return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default resetPasswordFieldErrorsReducer;
