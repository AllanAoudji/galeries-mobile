import { checkIfStatus } from '#store/checkers';
import { GALERIES_STATUS_RESET, GALERIES_STATUS_UPDATE } from '#store/galeries';

const initialState: { [key: string]: Store.Status } = {};
const galeriesStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_STATUS_RESET:
            return initialState;
        case GALERIES_STATUS_UPDATE:
            if (
                action.meta.query &&
                action.meta.query.name &&
                checkIfStatus(action.payload)
            )
                return {
                    ...state,
                    [action.meta.query.name]: action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default galeriesStatusReducer;
