import {
    LOGIN_FIELDS_ERROR_RESET,
    LOGIN_FIELDS_ERROR_UPDATE,
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
        case LOGIN_FIELDS_ERROR_RESET:
            return initialState;
        case LOGIN_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.password === 'string' ||
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

export default loginFieldsErrorReducer;
