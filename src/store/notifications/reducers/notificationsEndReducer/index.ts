import {
    NOTIFICATIONS_END_RESET,
    NOTIFICATIONS_END_UPDATE,
} from '#store/notifications/actionTypes';

const initialState: boolean = false;
const notificationsEndReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_END_RESET:
            return initialState;
        case NOTIFICATIONS_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
            return action.payload;
        default:
            return state;
    }
};

export default notificationsEndReducer;
