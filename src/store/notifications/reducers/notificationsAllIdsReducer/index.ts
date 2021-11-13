import {
    NOTIFICATIONS_ALL_IDS_RESET,
    NOTIFICATIONS_ALL_IDS_REMOVE,
    NOTIFICATIONS_ALL_IDS_SET,
} from '#store/notifications/actionTypes';

const initialState: string[] = [];
const notificationsAllIdsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case NOTIFICATIONS_ALL_IDS_RESET:
            return initialState;
        case NOTIFICATIONS_ALL_IDS_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const allIds = [...state];
            const newAllIds = allIds.filter((id) => id !== action.payload);
            return [...newAllIds];
        }
        case NOTIFICATIONS_ALL_IDS_SET: {
            if (!Array.isArray(action.payload)) return state;
            return { ...action.payload };
        }
        default:
            return state;
    }
};

export default notificationsAllIdsReducer;
