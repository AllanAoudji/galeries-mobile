import {
    FORGOT_YOUR_PASSWORD_FIELDS_ERROR_RESET,
    FORGOT_YOUR_PASSWORD_FIELDS_ERROR_UPDATE,
} from '#store/forgotYourPassword';

const initialState: { email: string } = { email: '' };
const forgotYourPasswordFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FORGOT_YOUR_PASSWORD_FIELDS_ERROR_RESET:
            return initialState;
        case FORGOT_YOUR_PASSWORD_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                action.payload.email === 'string'
            )
                return action.payload;
            return state;
        default:
            return state;
    }
};

export default forgotYourPasswordFieldsErrorReducer;
