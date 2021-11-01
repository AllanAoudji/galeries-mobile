import { checkIfStatus } from '#store/checkers';
import {
    GALERIE_BLACKLISTS_LOADING_DELETE_RESET,
    GALERIE_BLACKLISTS_LOADING_DELETE_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: Store.Status = 'PENDING';
const galerieBlackListsLoadingDeleteReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_LOADING_DELETE_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_LOADING_DELETE_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default galerieBlackListsLoadingDeleteReducer;
