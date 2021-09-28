import { checkIfSigninFieldsError } from '#store/checkers';
import {
    SIGNIN_FIELDS_ERROR_RESET,
    SIGNIN_FIELDS_ERROR_UPDATE,
} from '#store/signin';

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
            if (checkIfSigninFieldsError(action.payload))
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default signinFieldsErrorReducer;
