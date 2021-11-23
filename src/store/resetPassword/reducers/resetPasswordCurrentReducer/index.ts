import {
    RESET_PASSWORD_CURRENT_RESET,
    RESET_PASSWORD_CURRENT_UPDATE,
} from '#store/resetPassword/actionTypes';

const initialState: string | null = null;
const resetPasswordCurrentReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case RESET_PASSWORD_CURRENT_RESET:
            return initialState;
        case RESET_PASSWORD_CURRENT_UPDATE:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default resetPasswordCurrentReducer;
