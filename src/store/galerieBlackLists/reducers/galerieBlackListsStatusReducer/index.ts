import { checkIfStatus } from '#store/checkers';
import {
    GALERIE_BLACKLISTS_STATUS_RESET,
    GALERIE_BLACKLISTS_STATUS_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const galerieBlackListsStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_STATUS_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            if (!action.meta.query) return state;
            if (!action.meta.query.galerieId) return state;
            return {
                ...state,
                [action.meta.query.galerieId]: action.payload,
            };
        default:
            return state;
    }
};

export default galerieBlackListsStatusReducer;
