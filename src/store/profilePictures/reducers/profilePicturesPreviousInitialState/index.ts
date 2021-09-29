import {
    PROFILE_PICTURES_PREVIOUS_RESET,
    PROFILE_PICTURES_PREVIOUS_UPDATE,
} from '#store/profilePictures/actionTypes';

const initialState: string = '';
const profilePicturesPreviousReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_PREVIOUS_RESET:
            return initialState;
        case PROFILE_PICTURES_PREVIOUS_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default profilePicturesPreviousReducer;
