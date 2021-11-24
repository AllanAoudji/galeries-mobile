import {
    ME_FIELDS_ERROR_RESET,
    ME_FIELDS_ERROR_UPDATE,
} from '#store/me/actionTypes';

const initialState: { pseudonym: string } = { pseudonym: '' };
const meFieldsErrorReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case ME_FIELDS_ERROR_RESET:
            return initialState;
        case ME_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.pseudym === 'string' ||
                    typeof action.payload.confirmNewPassword === 'string' ||
                    typeof action.payload.currentPassword === 'string' ||
                    typeof action.payload.newPassword === 'string')
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
