import { USER_SET } from '#store/actions';

const initialState: Store.Models.User | null = null;

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USER_SET:
            return action.payload ? action.payload.data : undefined;
        default:
            return state;
    }
};
