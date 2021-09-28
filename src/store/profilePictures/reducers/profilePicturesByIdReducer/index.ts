import {
    PROFILE_PICTURES_BY_ID_REMOVE,
    PROFILE_PICTURES_BY_ID_RESET,
    PROFILE_PICTURES_BY_ID_SET,
} from '#store/profilePictures/actionTypes';

const initialState: {
    [key: string]: Store.Models.ProfilePicture;
} = {};
const profilePicturesByIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_BY_ID_REMOVE:
            if (typeof action.payload === 'string') {
                const newState = { ...state };
                delete newState[action.payload];
                return { ...newState };
            }
            return state;
        case PROFILE_PICTURES_BY_ID_RESET:
            return initialState;
        case PROFILE_PICTURES_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default profilePicturesByIdReducer;
