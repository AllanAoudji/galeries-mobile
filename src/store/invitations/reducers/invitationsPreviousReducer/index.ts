import {
    INVITATIONS_PREVIOUS_RESET,
    INVITATIONS_PREVIOUS_UPDATE,
} from '#store/invitations/actionTypes';

const initialState: { [key: string]: string } = {};
const invitationsPreviousReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case INVITATIONS_PREVIOUS_RESET:
            return initialState;
        case INVITATIONS_PREVIOUS_UPDATE:
            if (typeof action.payload !== 'string') return state;
            if (!action.meta.query || !action.meta.query.galerieId)
                return state;
            return {
                ...state,
                [action.meta.query.galerieId]: action.payload,
            };
        default:
            return state;
    }
};

export default invitationsPreviousReducer;
