import { Reducer } from 'redux';
import {
    CONFIRM_ACCOUNT_FIELDS_ERROR_RESET,
    CONFIRM_ACCOUNT_FIELDS_ERROR_UPDATE,
} from '#store/confirmAccount/actionTypes';

const initialState: { email: string } = { email: '' };
const confirmAccountFieldsErrorReducer: Reducer<
    typeof initialState,
    Store.Action
> = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRM_ACCOUNT_FIELDS_ERROR_RESET:
            return initialState;
        case CONFIRM_ACCOUNT_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.email === 'string'
            )
                return { ...state, ...action.payload };
            return state;
        default:
            return state;
    }
};

export default confirmAccountFieldsErrorReducer;
