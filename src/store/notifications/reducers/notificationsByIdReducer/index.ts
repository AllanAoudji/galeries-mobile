import {
    NOTIFICATIONS_BY_ID_REMOVE,
    NOTIFICATIONS_BY_ID_RESET,
    NOTIFICATIONS_BY_ID_SET,
    NOTIFICATIONS_BY_ID_UPDATE,
} from '#store/notifications/actionTypes';

const initialState: { [key: string]: Store.Models.Notification } = {};
const notificationsByIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_BY_ID_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case NOTIFICATIONS_BY_ID_RESET:
            return initialState;
        case NOTIFICATIONS_BY_ID_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        case NOTIFICATIONS_BY_ID_UPDATE:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                [action.payload.id]: { ...action.payload },
            };
        default:
            return state;
    }
};

export default notificationsByIdReducer;
