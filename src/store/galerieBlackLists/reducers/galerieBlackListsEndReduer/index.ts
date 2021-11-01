import {
    GALERIE_BLACKLISTS_END_RESET,
    GALERIE_BLACKLISTS_END_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: { [key: string]: boolean } = {};
const galerieBlackListsEndReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_END_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
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

export default galerieBlackListsEndReducer;
