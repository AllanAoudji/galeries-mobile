import {
    GALERIE_BLACKLISTS_CURRENT_RESET,
    GALERIE_BLACKLISTS_CURRENT_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: string | null = null;
const galerieBlackListsCurrentReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_CURRENT_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_CURRENT_UPDATE:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default galerieBlackListsCurrentReducer;
