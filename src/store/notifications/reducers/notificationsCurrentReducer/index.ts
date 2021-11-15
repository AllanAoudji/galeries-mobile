import {
    NOTIFICATIONS_CURRENT_UPDATE,
    NOTIFICATIONS_CURRENT_RESET,
} from '#store/notifications/actionTypes';

const initialState: string | null = null;
const notificationsCurrentReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_CURRENT_RESET:
            return initialState;
        case NOTIFICATIONS_CURRENT_UPDATE: {
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        }
        default:
            return state;
    }
};

export default notificationsCurrentReducer;
