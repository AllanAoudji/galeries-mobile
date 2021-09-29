import {
    GALERIES_FIELDS_ERROR_RESET,
    GALERIES_FIELDS_ERROR_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: { descrition: string; name: string } = {
    descrition: '',
    name: '',
};
const galeriesFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_FIELDS_ERROR_RESET:
            return initialState;
        case GALERIES_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.description === 'string' ||
                    typeof action.payload.name === 'string')
            )
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default galeriesFieldsErrorReducer;
