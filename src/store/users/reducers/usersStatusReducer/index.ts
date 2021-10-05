import { checkIfStatus } from '#store/checkers';
import {
    USERS_STATUS_RESET,
    USERS_STATUS_UPDATE,
} from '#store/users/actionTypes';

const intialState: { [key: string]: Store.Status } = {};
const usersStatusReducer = (state = intialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_STATUS_RESET:
            return intialState;
        case USERS_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            if (action.meta.query && action.meta.query.galerieId)
                return {
                    ...state,
                    [action.meta.query.galerieId]: action.payload,
                };
            return {
                ...state,
                '': action.payload,
            };
        default:
            return state;
    }
};

export default usersStatusReducer;
