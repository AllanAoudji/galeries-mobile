import {
    NOTIFICATIONS_PREVIOUS_RESET,
    NOTIFICATIONS_PREVIOUS_UPDATE,
} from '#store/notifications/actionTypes';

const initalState: string | null = null;
const notificationsPreviousReducer = (
    state = initalState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_PREVIOUS_RESET:
            return state;
        case NOTIFICATIONS_PREVIOUS_UPDATE:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default notificationsPreviousReducer;
