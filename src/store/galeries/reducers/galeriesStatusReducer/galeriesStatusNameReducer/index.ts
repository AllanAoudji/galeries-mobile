import { checkIfStatus } from '#store/checkers';
import {
    GALERIES_STATUS_NAME_RESET,
    GALERIES_STATUS_NAME_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const galeriesStatusNameReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_STATUS_NAME_RESET:
            return initialState;
        case GALERIES_STATUS_NAME_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.name ||
                !checkIfStatus(action.payload)
            )
                return state;
            return {
                ...state,
                [action.meta.query.name]: action.payload,
            };
        default:
            return state;
    }
};

export default galeriesStatusNameReducer;
