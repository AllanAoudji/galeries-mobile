import { GALERIES_ALL_IDS_RESET, GALERIES_ALL_IDS_SET } from '#store/galeries';

const initialState: { [key: string]: string[] } = {};
const galeriesAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_ALL_IDS_RESET:
            return initialState;
        case GALERIES_ALL_IDS_SET:
            if (
                action.meta.query &&
                action.meta.query.name &&
                Array.isArray(action.payload)
            )
                return {
                    ...state,
                    [action.meta.query.name]: {
                        ...state[action.meta.query.name],
                        ...action.payload,
                    },
                };
            return state;
        default:
            return state;
    }
};

export default galeriesAllIdsReducer;
