import {
    PROFILE_PICTURES_END_RESET,
    PROFILE_PICTURES_END_UPDATE,
} from '#store/profilePictures/actionTypes';

const initialState: boolean = false;
const profilePicturesEndReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_END_RESET:
            return initialState;
        case PROFILE_PICTURES_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
            return action.payload;
        default:
            return state;
    }
};

export default profilePicturesEndReducer;
