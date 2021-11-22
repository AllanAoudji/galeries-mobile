import { checkIfSigninFieldsError } from '#store/checkers';
import {
    SIGNIN_FIELDS_ERROR_RESET,
    SIGNIN_FIELDS_ERROR_UPDATE,
} from '#store/signin/actionTypes';

const initialState: {
    betaKey: string;
    confirmPassword: string;
    email: string;
    password: string;
    userName: string;
} = {
    betaKey: '',
    confirmPassword: '',
    email: '',
    password: '',
    userName: '',
};
const signinFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case SIGNIN_FIELDS_ERROR_RESET:
            return initialState;
        case SIGNIN_FIELDS_ERROR_UPDATE:
            if (!checkIfSigninFieldsError(action.payload)) return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default signinFieldsErrorReducer;
