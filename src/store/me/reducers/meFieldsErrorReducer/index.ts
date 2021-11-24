import {
    ME_FIELDS_ERROR_RESET,
    ME_FIELDS_ERROR_UPDATE,
} from '#store/me/actionTypes';

const initialState: {
    confirmNewPassword: string;
    currentPassword: string;
    deletePassword: string;
    deleteAccountSentence: string;
    emailPassword: string;
    newPassword: string;
    pseudonym: string;
    userNameOrEmail: string;
} = {
    confirmNewPassword: '',
    currentPassword: '',
    deletePassword: '',
    deleteAccountSentence: '',
    emailPassword: '',
    newPassword: '',
    pseudonym: '',
    userNameOrEmail: '',
};
const meFieldsErrorReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case ME_FIELDS_ERROR_RESET:
            return initialState;
        case ME_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.pseudym === 'string' ||
                    typeof action.payload.deletePassword === 'string' ||
                    typeof action.payload.deleteAccountSentence === 'string' ||
                    typeof action.payload.emailPassword === 'string' ||
                    typeof action.payload.confirmNewPassword === 'string' ||
                    typeof action.payload.currentPassword === 'string' ||
                    typeof action.payload.newPassword === 'string' ||
                    typeof action.payload.userNameOrEmail === 'string')
            )
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default meFieldsErrorReducer;
