import { NOTIFICATION_RESET, NOTIFICATION_UPDATE } from '../actionTypes';

const notificationInitialState: {
    status: 'error' | 'success';
    text: string;
} | null = null;
export const notificationReducer = (
    state = notificationInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATION_RESET:
            return notificationInitialState;
        case NOTIFICATION_UPDATE:
            return action.payload;
        default:
            return state;
    }
};

export default notificationReducer;
