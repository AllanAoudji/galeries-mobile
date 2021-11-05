import {
    GALERIE_BLACKLISTS_BY_ID_REMOVE,
    GALERIE_BLACKLISTS_BY_ID_RESET,
    GALERIE_BLACKLISTS_BY_ID_SET,
    GALERIE_BLACKLISTS_BY_ID_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

const initialState: { [key: string]: Store.Models.GalerieBlackList } = {};
const galerieBlackListsByIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_BLACKLISTS_BY_ID_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case GALERIE_BLACKLISTS_BY_ID_RESET:
            return initialState;
        case GALERIE_BLACKLISTS_BY_ID_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        case GALERIE_BLACKLISTS_BY_ID_UPDATE:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                [action.payload.id]: { ...action.payload },
            };
        default:
            return state;
    }
};

export default galerieBlackListsByIdReducer;
