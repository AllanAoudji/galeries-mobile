import { NOTIFICATION_SET } from '#store/actions';

const initailState: Store.Models.Notification | null = null;

export default (state = initailState, action: Store.Action) => {
    switch (action.type) {
        case NOTIFICATION_SET:
            return action.payload ? action.payload.data : null;
        default:
            return state;
    }
};
