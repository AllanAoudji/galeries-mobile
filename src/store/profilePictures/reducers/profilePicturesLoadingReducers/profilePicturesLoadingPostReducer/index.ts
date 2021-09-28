import { checkIfStatus } from '#store/checkers';
import {
    PROFILE_PICTURES_LOADING_POST_RESET,
    PROFILE_PICTURES_LOADING_POST_UPDATE,
} from '#store/profilePictures';

const initialState: Store.Status = 'PENDING';
const profilePicturesLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_LOADING_POST_RESET:
            return initialState;
        case PROFILE_PICTURES_LOADING_POST_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default profilePicturesLoadingPostReducer;
