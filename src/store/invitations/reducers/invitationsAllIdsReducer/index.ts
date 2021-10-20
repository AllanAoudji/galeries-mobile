import { checkIfAllIds } from '#store/checkers';
import {
    INVITATIONS_ALL_IDS_REMOVE,
    INVITATIONS_ALL_IDS_RESET,
    INVITATIONS_ALL_IDS_SET,
} from '#store/invitations/actionTypes';

const initialState: { [key: string]: string[] } = {};
const invitationsAllIdsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case INVITATIONS_ALL_IDS_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            if (!action.meta.query || !action.meta.query.galerieId)
                return state;
            const allIds = state[action.meta.query.galerieId];
            if (!allIds) return state;
            const newAllIds = allIds.filter((id) => id !== action.payload);
            return {
                ...state,
                [action.meta.query.galerieId]: newAllIds,
            };
        }
        case INVITATIONS_ALL_IDS_RESET:
            return initialState;
        case INVITATIONS_ALL_IDS_SET:
            if (!checkIfAllIds(action.payload)) return state;
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

export default invitationsAllIdsReducer;
