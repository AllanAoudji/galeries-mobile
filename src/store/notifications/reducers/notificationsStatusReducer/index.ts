import { checkIfStatus } from '#store/checkers';
import {
    NOTIFICATIONS_STATUS_RESET,
    NOTIFICATIONS_STATUS_UPDATE,
} from '#store/notifications/actionTypes';

const initialState: Store.Status = 'PENDING';
const notificationsStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_STATUS_RESET:
            return initialState;
        case NOTIFICATIONS_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default notificationsStatusReducer;
