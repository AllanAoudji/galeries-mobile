import {
    FRAMES_FIELDS_ERROR_RESET,
    FRAMES_FIELDS_ERROR_UPDATE,
} from '#store/frames';

const initialState: { description?: string } = {};
const framesFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_FIELDS_ERROR_RESET:
            return initialState;
        case FRAMES_FIELDS_ERROR_UPDATE:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default framesFieldsErrorReducer;
