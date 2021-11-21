import {
    PROFILE_PICTURES_CURRENT_RESET,
    PROFILE_PICTURES_CURRENT_UPDATE,
} from '#store/profilePictures/actionTypes';

const initialState: string | null = null;
const profilePicturesCurrentReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_CURRENT_RESET:
            return initialState;
        case PROFILE_PICTURES_CURRENT_UPDATE: {
            if (typeof action.payload === 'string') return action.payload;
            return state;
        }
        default:
            return state;
    }
};

export default profilePicturesCurrentReducer;
