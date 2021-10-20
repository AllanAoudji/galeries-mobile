import { checkIfStatus } from '#store/checkers';
import {
    INVITATIONS_LOADING_POST_RESET,
    INVITATIONS_LOADING_POST_UPDATE,
} from '#store/invitations/actionTypes';

const initialState: Store.Status = 'PENDING';
const invitationsLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case INVITATIONS_LOADING_POST_RESET:
            return initialState;
        case INVITATIONS_LOADING_POST_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default invitationsLoadingPostReducer;
