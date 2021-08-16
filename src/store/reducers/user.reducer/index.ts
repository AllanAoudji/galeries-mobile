import { USER_SET } from '#store/actions';

const initialState: {
    status: Store.Status;
    data: Store.Models.User | null;
} = {
    status: 'PENDING',
    data: null,
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USER_SET:
            return {
                ...state,
                ...(action.payload ? action.payload.data : undefined),
            };
        default:
            return state;
    }
};
