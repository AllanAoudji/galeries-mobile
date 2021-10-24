import {
    INVITATIONS_CURRENT_RESET,
    INVITATIONS_CURRENT_UPDATE,
} from '#store/invitations/actionTypes';

const initialState: string | null = null;
const invitationsCurrentReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case INVITATIONS_CURRENT_RESET:
            return initialState;
        case INVITATIONS_CURRENT_UPDATE: {
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        }
        default:
            return state;
    }
};

export default invitationsCurrentReducer;
