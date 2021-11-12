import { checkIfStatus } from '#store/checkers';
import {
    NOTIFICATIONS_LOADING_DELETE_RESET,
    NOTIFICATIONS_LOADING_DELETE_UPDATE,
} from '#store/notifications/actionTypes';

const initialState: Store.Status = 'PENDING';
const notificationsLoadingDeleteReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_LOADING_DELETE_RESET:
            return initialState;
        case NOTIFICATIONS_LOADING_DELETE_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default notificationsLoadingDeleteReducer;
