import { ME_SET } from '#store/actions';

const initialState: {
    status: Store.Status;
    id: string | null;
} = {
    status: 'PENDING',
    id: null,
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case ME_SET: {
            const id =
                action.payload.data.id !== undefined
                    ? action.payload.data.id
                    : state.id;
            const status = action.payload.data.status || state.status;
            return {
                ...state,
                id,
                status,
            };
        }
        default:
            return state;
    }
};
