import { FRAMES_END_RESET, FRAMES_END_UPDATE } from '#store/frames/actionTypes';

const initialState: { [key: string]: '' } = {};
const framesEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_END_RESET:
            return initialState;
        case FRAMES_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
            if (action.meta.query && action.meta.query.galerieId) {
                return {
                    ...state,
                    [action.meta.query.galerieId]: action.payload,
                };
            }
            return {
                ...state,
                '': action.payload,
            };

        default:
            return state;
    }
};

export default framesEndReducer;
