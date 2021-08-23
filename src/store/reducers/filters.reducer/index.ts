import { FILTERS_SET } from '#store/actions';

const initialState: {
    galeries: {
        name: string;
    };
} = {
    galeries: {
        name: '',
    },
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FILTERS_SET:
            return {
                ...state,
                ...action.payload.data,
            };
        default:
            return state;
    }
};
