import {
    FRAMES_FIELDS_ERROR_RESET,
    FRAMES_FIELDS_ERROR_UPDATE,
} from '#store/frames/actionTypes';

const initialState: { description: string } = { description: '' };
const framesFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_FIELDS_ERROR_RESET:
            return initialState;
        case FRAMES_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.description === 'string'
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

export default framesFieldsErrorReducer;
