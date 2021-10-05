import { checkIfAllIds } from '#store/checkers';
import {
    FRAMES_ALL_IDS_REMOVE,
    FRAMES_ALL_IDS_RESET,
    FRAMES_ALL_IDS_SET,
} from '#store/frames/actionTypes';

const initialState: { [key: string]: string[] } = {};
const framesAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_ALL_IDS_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            if (action.meta.query && action.meta.query.galerieId) {
                const allIds = state[action.meta.query.galerieId];
                if (!allIds) return state;
                const newAllIds = allIds.filter((id) => id !== action.payload);
                return {
                    ...state,
                    [action.meta.query.galerieId]: newAllIds,
                };
            }
            const allIds = state[''];
            const newAllIds = allIds.filter((id) => id !== action.payload);
            return {
                ...state,
                '': newAllIds,
            };
        }
        case FRAMES_ALL_IDS_RESET:
            return initialState;
        case FRAMES_ALL_IDS_SET:
            if (!checkIfAllIds(action.payload)) return state;
            if (action.meta.query && action.meta.query.galerieId) {
                return {
                    ...state,
                    [action.meta.query.galerieId]: action.payload,
                };
            }
            return {
                ...state,
                '': action.payload,
            };
        default:
            return state;
    }
};

export default framesAllIdsReducer;
