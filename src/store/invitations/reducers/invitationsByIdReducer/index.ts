import {
    INVITATIONS_BY_ID_REMOVE,
    INVITATIONS_BY_ID_RESET,
    INVITATIONS_BY_ID_SET,
} from '#store/invitations/actionTypes';

const initialState: { [key: string]: Store.Models.Invitation } = {};
const invitationsByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case INVITATIONS_BY_ID_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const newState = { ...state };
            delete newState[action.payload];
            return { newState };
        }
        case INVITATIONS_BY_ID_RESET:
            return initialState;
        case INVITATIONS_BY_ID_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default invitationsByIdReducer;
