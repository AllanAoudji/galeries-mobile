import { checkIfAllIds } from '#store/checkers';
import {
    GALERIE_BLACKLISTS_ALL_IDS_REMOVE,
    GALERIE_BLACKLISTS_ALL_IDS_RESET,
    GALERIE_BLACKLISTS_ALL_IDS_SET,
} from '#store/galerieBlackLists/actionTypes';

const initialState: { [key: string]: string[] } = {};
const galerieBlackListsAllIdsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_ALL_IDS_REMOVE: {
            if (!action.meta.query) return state;
            if (!action.meta.query.galerieId) return state;
            if (typeof action.payload !== 'string') return state;
            const allIds = state[action.meta.query.galerieId];
            const newAllIds = allIds.filter((id) => id !== action.payload);
            return {
                ...state,
                [action.meta.query.galerieId]: newAllIds,
            };
        }
        case GALERIE_BLACKLISTS_ALL_IDS_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_ALL_IDS_SET:
            if (!action.meta.query) return state;
            if (!action.meta.query.galerieId) return state;
            if (!checkIfAllIds(action.payload)) return state;
            return {
                ...state,
                [action.meta.query.galerieId]: action.payload,
            };
        default:
            return state;
    }
};

export default galerieBlackListsAllIdsReducer;
