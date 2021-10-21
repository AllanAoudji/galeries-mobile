import {
    INVITATIONS_END_RESET,
    INVITATIONS_END_UPDATE,
} from '#store/invitations/actionTypes';

const initialState: { [key: string]: boolean } = {};
const invitationEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case INVITATIONS_END_RESET:
            return initialState;
        case INVITATIONS_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
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

export default invitationEndReducer;
