import { checkIfStatus } from '#store/checkers';
import {
    PROFILE_PICTURES_LOADING_DELETE_RESET,
    PROFILE_PICTURES_LOADING_DELETE_UPDATE,
} from '#store/profilePictures';

const initialState: Store.Status = 'PENDING';
const profilePicturesLoadingDeleteReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_LOADING_DELETE_RESET:
            return initialState;
        case PROFILE_PICTURES_LOADING_DELETE_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default profilePicturesLoadingDeleteReducer;
