import { checkIfAllIds } from '#store/checkers';
import {
    USERS_ALL_IDS_REMOVE,
    USERS_ALL_IDS_RESET,
    USERS_ALL_IDS_SET,
} from '#store/users/actionTypes';

const initialState: { [key: string]: string[] } = {};
const usersAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_ALL_IDS_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            if (action.meta.query && action.meta.query.galerieId) {
                const newState = [...state[action.meta.query.galerieId]];
                return {
                    ...state,
                    [action.meta.query.galerieId]: newState.filter(
                        (id) => id !== action.payload
                    ),
                };
            }
            const newState = [...state['']];
            return {
                ...state,
                '': newState.filter((id) => id !== action.payload),
            };
        }
        case USERS_ALL_IDS_RESET:
            return initialState;
        case USERS_ALL_IDS_SET:
            if (!checkIfAllIds(action.payload)) return state;
            if (action.meta.query && action.meta.query.galerieId)
                return {
                    ...state,
                    [action.meta.query.galerieId]: action.payload,
                };

            return { ...state, '': action.payload };
        default:
            return state;
    }
};

export default usersAllIdsReducer;
