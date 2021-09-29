import { ME_ID_RESET, ME_ID_UPDATE } from '#store/me/actionTypes';

const initialState: string | null = null;
const meIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case ME_ID_RESET:
            return initialState;
        case ME_ID_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default meIdReducer;
