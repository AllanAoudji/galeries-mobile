import {
    PROFILE_PICTURES_ID_REMOVE,
    PROFILE_PICTURES_ID_RESET,
    PROFILE_PICTURES_ID_UPDATE,
} from '#store/profilePictures';

const initialState: { [key: string]: string } = {};
const profilePicturesIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_ID_REMOVE: {
            if (!action.meta.query || !action.meta.query.userId) return state;
            const newState = { ...state };
            delete newState[action.meta.query.userId];
            return newState;
        }
        case PROFILE_PICTURES_ID_RESET:
            return initialState;
        case PROFILE_PICTURES_ID_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.userId ||
                typeof action.payload !== 'string'
            )
                return state;
            return {
                ...state,
                [action.meta.query.userId]: action.payload,
            };
        default:
            return state;
    }
};

export default profilePicturesIdReducer;
