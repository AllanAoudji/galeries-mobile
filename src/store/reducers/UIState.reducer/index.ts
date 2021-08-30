import { UI_STATES_SET } from '#store/actions';

const initialState: {
    currentGalerieId?: string;
    filters: {
        galeries: {
            name: string;
        };
    };
} = {
    filters: {
        galeries: {
            name: '',
        },
    },
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case UI_STATES_SET:
            return {
                ...state,
                ...action.payload.data,
            };
        default:
            return state;
    }
};
