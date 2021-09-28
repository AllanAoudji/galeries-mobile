import {
    LOGIN_FIELD_ERRORS_RESET,
    LOGIN_FIELD_ERRORS_UPDATE,
} from '#store/login/actionTypes';

const initialState: {
    password: string;
    userNameOrEmail: string;
} = {
    password: '',
    userNameOrEmail: '',
};
const loginFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case LOGIN_FIELD_ERRORS_RESET:
            return initialState;
        case LOGIN_FIELD_ERRORS_UPDATE:
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.description === 'string' ||
                    typeof action.payload.name === 'string')
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

export default loginFieldsErrorReducer;
