import { checkIfStatus } from '#store/checkers';
import {
    GALERIES_STATUS_ID_RESET,
    GALERIES_STATUS_ID_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const galeriesStatusIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_STATUS_ID_RESET:
            return initialState;
        case GALERIES_STATUS_ID_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.galerieId ||
                !checkIfStatus(action.payload)
            )
                return state;
            return {
                ...state,
                [action.meta.query.galerieId]: action.payload,
            };
        default:
            return state;
    }
};

export default galeriesStatusIdReducer;
