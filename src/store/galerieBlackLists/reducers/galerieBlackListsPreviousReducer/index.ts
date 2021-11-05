import {
    GALERIE_BLACKLISTS_PREVIOUS_RESET,
    GALERIE_BLACKLISTS_PREVIOUS_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: { [key: string]: string } = {};
const galerieBlackListsPreviousReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_PREVIOUS_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_PREVIOUS_UPDATE:
            if (typeof action.payload !== 'string') return state;
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

export default galerieBlackListsPreviousReducer;
