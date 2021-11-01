import { checkIfStatus } from '#store/checkers';
import {
    GALERIE_BLACKLISTS_LOADING_POST_RESET,
    GALERIE_BLACKLISTS_LOADING_POST_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: Store.Status = 'PENDING';
const galerieBlackListsLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_LOADING_POST_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_LOADING_POST_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default galerieBlackListsLoadingPostReducer;
