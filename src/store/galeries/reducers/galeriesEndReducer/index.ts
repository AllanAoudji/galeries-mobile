import {
    GALERIES_END_RESET,
    GALERIES_END_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: { [key: string]: boolean } = {};
const galeriesEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_END_RESET:
            return initialState;
        case GALERIES_END_UPDATE:
            if (
                !action.meta.query ||
                action.meta.query.name === undefined ||
                typeof action.payload !== 'boolean'
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

export default galeriesEndReducer;
