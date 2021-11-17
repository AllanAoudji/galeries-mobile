import {
    PROFILE_PICTURES_ALL_ID_REMOVE,
    PROFILE_PICTURES_ALL_ID_RESET,
    PROFILE_PICTURES_ALL_ID_SET,
} from '#store/profilePictures/actionTypes';

const initialState: string[] = [];
const profilePicturesAllIdsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_ALL_ID_REMOVE:
            if (typeof action.payload === 'string')
                return state.filter(
                    (profilePictureId) => profilePictureId !== action.payload
                );
            return state;
        case PROFILE_PICTURES_ALL_ID_RESET:
            return initialState;
        case PROFILE_PICTURES_ALL_ID_SET:
            if (Array.isArray(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default profilePicturesAllIdsReducer;
